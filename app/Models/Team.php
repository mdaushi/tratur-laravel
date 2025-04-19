<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Laratrust\Models\Team as LaratrustTeam;
use Mtvs\EloquentHashids\HasHashid;
use Mtvs\EloquentHashids\HashidRouting;

class Team extends LaratrustTeam
{
    use HasHashid, HashidRouting;

    public $guarded = [];

    protected $appends = ['hashid'];

    public function members(): MorphToMany
    {
        return $this->morphedByMany(User::class, 'user', 'role_user')
            ->withPivot('role_id', 'team_id', 'status')
            ->wherePivot('team_id', $this->id)
            ->with('roles');
    }
}
