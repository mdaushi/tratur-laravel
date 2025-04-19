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
        return Inertia::render('teams/member', [
            'team' => $team
        ]);
    }
}
