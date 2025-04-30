<?php

namespace App\Http\Controllers\Teams;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreTeamRequest;
use App\Models\Team;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;

class GeneralController extends Controller
{
    public function edit(Team $team)
    {
        return Inertia::render("teams/general", [
            'team' => $team,
            'permissions' => [
                'teams-delete' => request()->user()->can('delete', $team),
                'teams-update' => request()->user()->can('update', $team)
            ]
        ]);
    }

    public function update(Team $team, StoreTeamRequest $request)
    {
        if (!Gate::allows('update', $team)) {
            return back()->with('error', 'This action is unauthorized.');
        }

        DB::beginTransaction();

        try {
            $team->update([
                'name' => $request->name
            ]);

            DB::commit();

            return redirect()->back();
        } catch (\Throwable $th) {
            DB::rollBack();

            return redirect()->back(500);
        }
    }
}
