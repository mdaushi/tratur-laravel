<?php

namespace App\Http\Controllers\Teams;

use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\DestroyTeamRequest;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class TeamController extends Controller
{
    public function index()
    {
        if (!Gate::allows('view', 'App\Models\team')) {
            return back()->with('error', 'This action is unauthorized.');
        }

        $user = Auth::user();

        $teams = $user->rolesTeams()->get();

        return Inertia::render("teams/list", [
            'teams' => Inertia::defer(function () use ($teams) {
                return $teams->map(function ($team) {
                    $members = $team->members()->get()->map(function ($member) {
                        return [
                            'id' => $member->id,
                            'name' => $member->name,
                            'email' => $member->email,
                            'role' => $member->role,
                            'status' => $member->status,
                        ];
                    });

                    // Ambil semua role yang dipakai di tim ini
                    $availableRoles = Role::whereHas('users', function ($q) use ($team) {
                        $q->where('role_user.team_id', $team->id)
                            ->where('role_user.user_type', User::class);
                    })
                        ->with(['permissions:name'])
                        ->get()
                        ->map(function ($role) use ($team) {
                            return [
                                'id' => $role->id,
                                'name' => $role->name,
                                'description' => $role->description,
                                'permissions' => $role->permissions->pluck('name')->toArray(),
                                'userCount' => $role->users()
                                    ->wherePivot('team_id', $team->id)
                                    ->wherePivot('user_type', User::class)
                                    ->count(),
                            ];
                        });


                    return [
                        'hashid' => $team->hashid,
                        'id' => $team->id,
                        'name' => $team->name,
                        'description' => $team->description,
                        'memberCount' => $members->count(),
                        'roleCount' => $availableRoles->count(),
                        'members' => $members,
                        'availableRoles' => $availableRoles,
                    ];
                });
            })
        ]);
    }

    public function show(Team $team)
    {
        return to_route("teams.general.edit", [$team->hashid]);
    }

    public function switch(Request $request, $teamId)
    {
        $user = $request->user();

        try {
            // session-only switching untuk perpindahan sementara
            $user->setCurrentTeam($teamId);
            return redirect()->back()->with('success', 'Berhasil beralih team');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }

    public function destroy(Team $team, DestroyTeamRequest $request)
    {
        if (!Gate::allows('delete', $team)) {
            return back()->with('error', 'This action is unauthorized.');
        }

        DB::beginTransaction();
        try {
            $team->delete();
            session()->forget('current_team_id');

            DB::commit();

            return redirect()->route('teams.index')->with('success', 'Team deleted successfully.');
        } catch (\Throwable $th) {
            DB::rollBack();

            return back()->with('error', $th->getMessage());
        }
    }
}
