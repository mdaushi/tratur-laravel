<?php

namespace App\Http\Controllers\Teams;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    public function switchTeam(Request $request, $teamId)
    {
        $user = $request->user();

        try {
            // session-only switching untuk perpindahan sementara
            $user->switchTeamSession($teamId);
            return redirect()->back()->with('success', 'Berhasil beralih team');
        } catch (\Exception $e) {
            return redirect()->back()->with('error', $e->getMessage());
        }
    }
}
