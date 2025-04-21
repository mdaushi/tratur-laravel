<?php

namespace App\Http\Controllers\Teams;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MemberController extends Controller
{
    public function edit(Team $team)
    {
        $members = $team->members->map(function ($member) {
            return [
                'id' => $member->id,
                'name' => $member->name,
                'email' => $member->email,
                'role' => $member->roles()->pluck('name')
            ];
        });

        return Inertia::render('teams/member', [
            'team' => $team,
            'members' => $members
        ]);
    }
}
