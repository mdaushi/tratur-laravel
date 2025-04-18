<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laratrust\Models\Team as LaratrustTeam;

class Team extends LaratrustTeam
{
    public $guarded = [];

    public function members(): MorphToMany
    {
        return $this->morphedByMany(User::class, 'user', 'role_user')
            ->withPivot('role_id', 'team_id', 'status')
            ->wherePivot('team_id', $this->id)
            ->with('roles');
    }
}
