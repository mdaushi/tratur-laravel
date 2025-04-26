<?php

namespace App\Http\Controllers\Teams;

use App\Enums\ModalRoute;
use App\Http\Controllers\Controller;
use App\Http\Requests\Teams\MemberRequest;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class MemberController extends Controller
{
    private function getMembers($team)
    {
        return $team->members->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'role' => $member->roles()->pluck('name'),
                'status' => $member->pivot->status
            ];
        });
    }

    public function index(Team $team)
    {
        $members = $this->getMembers($team);

        $roles = Role::select('id', 'name')->get();

        return Inertia::render('teams/member', [
            'team' => $team,
            'members' => $members,
            'roles' => $roles,
            'modal' => null
        ]);
    }

    public function create(Team $team)
    {
        $roles = Role::select('id', 'name')->get();

        return Inertia::render('teams/member', [
            'team' => $team,
            'members' => $this->getMembers($team),
            'roles' => $roles,
            'modal' => ModalRoute::Create,
        ]);
    }

    public function store(Team $team, MemberRequest $request)
    {
        DB::beginTransaction();
        try {
            $user = User::where('email', $request->email)->first();

            if (!$user) {
                DB::commit();
                return back()->withErrors('user not found', 'error');
            }

            $user->addRoleWithStatus($request->role_id, $team->id);

            DB::commit();

            return back()->with('success', 'Invitation has been sent');
        } catch (\Throwable $th) {
            DB::rollBack();

            Log::error('failed to add member: ', [$th->getMessage()]);

            return back()->withErrors('Failed to invite member', 'error');
        }
    }
}
