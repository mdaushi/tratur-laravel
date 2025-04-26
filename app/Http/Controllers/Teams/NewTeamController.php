<?php

namespace App\Http\Controllers\Teams;

use App\Enums\InvitationStatus;
use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamRequest;
use App\Models\Team;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class NewTeamController extends Controller
{
    public function index()
    {
        return Inertia::render("teams/New");
    }

    public function store(StoreTeamRequest $request)
    {
        $user = Auth::user();

        DB::beginTransaction();
        try {
            $team = Team::create(['name' => $request->name]);

            $user->addRoleWithStatus('owner', $team->id, InvitationStatus::ACCEPTED);

            // set default jika team belum ada
            if (!$user->default_team_id) {
                $user->setDefaultTeam($team->id);
            }
            $user->setCurrentTeam($team->id);

            DB::commit();

            return to_route('dashboard');
        } catch (\Throwable $th) {
            DB::rollBack();

            Log::error('Failed create a new team: ', [$th->getMessage()]);

            return redirect()->back()->withErrors('Failed create a new team', 'error');
        }
    }
}
