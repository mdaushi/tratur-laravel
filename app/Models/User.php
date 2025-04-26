<?php

namespace App\Models;

use App\Enums\InvitationStatus;
use BackedEnum;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\MorphToMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\DB;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;
use Ramsey\Uuid\UuidInterface;
use Illuminate\Support\Str;
use Laratrust\Helper;

class User extends Authenticatable implements LaratrustUser, MustVerifyEmail
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasRolesAndPermissions;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'current_team_id',
        'default_team_id'
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function defaultTeam()
    {
        return $this->belongsTo(Team::class, 'default_team_id');
    }

    public function currentTeamDB()
    {
        return $this->belongsTo(Team::class, 'current_team_id');
    }

    // Team management methods
    public function setDefaultTeam($teamId)
    {
        // Validasi team
        if (!$this->hasAccessToTeam($teamId)) {
            throw new \Exception('User tidak memiliki akses ke team ini');
        }

        $this->default_team_id = $teamId;

        // Jika belum ada current team, set default sebagai current juga
        if (!$this->current_team_id) {
            $this->current_team_id = $teamId;
        }

        $this->save();

        // Update session juga
        session(['current_team_id' => $teamId]);

        return $this;
    }

    public function setCurrentTeam($teamId)
    {
        // Validasi team
        if (!$this->hasAccessToTeam($teamId)) {
            throw new \Exception('User tidak memiliki akses ke team ini');
        }

        $this->current_team_id = $teamId;
        $this->save();

        // Update session juga
        session(['current_team_id' => $teamId]);

        return $this;
    }

    public function switchTeamSession($teamId)
    {
        // Validasi team
        if (!$this->hasAccessToTeam($teamId)) {
            throw new \Exception('User tidak memiliki akses ke team ini');
        }

        // Hanya update session, tidak update database
        session(['current_team_id' => $teamId]);

        return $this;
    }

    public function getCurrentTeamId()
    {
        // Check if the user has any associated teams
        if (!$this->rolesTeams()->exists()) {
            return null;
        }

        // Prioritaskan team dari session
        $teamId = session('current_team_id');

        // Jika tidak ada di session, gunakan current_team_id dari database
        if (!$teamId) {
            $teamId = $this->current_team_id;

            $role = $this->roles()->where('name', 'owner')->first();

            // jika default_team_id tidak ada, jadikan team lain sebagai default
            if (!$this->default_team_id && $role) {
                $team = $this->rolesTeams()->wherePivot('role_id', $role->id)->first();
                $this->default_team_id = $team->id;
                $this->save();

                $teamId = $team->id;
            }

            // Jika current_team_id juga tidak ada, gunakan default_team_id
            if (!$teamId) {
                $teamId = $this->default_team_id;
            }

            // Jika ditemukan team ID dari database, update session
            if ($teamId) {
                session(['current_team_id' => $teamId]);

                //  update current team id
                $this->current_team_id = $this->default_team_id;
                $this->save();
            }
        }

        return $teamId;
    }

    public function currentTeam()
    {
        // Check if the user has any associated teams
        if (!$this->rolesTeams()->exists()) {
            return null;
        }

        // Get the current team ID
        $teamId = $this->getCurrentTeamId();

        // Return the team if the ID exists, otherwise return null
        return $teamId ? Team::find($teamId) : null;
    }

    public function resetTeamSession()
    {
        // Reset session ke nilai database
        session(['current_team_id' => $this->current_team_id]);

        return $this;
    }

    public function hasAccessToTeam($teamId)
    {
        return DB::table('role_user')
            ->where('user_id', $this->id)
            ->where('user_type', get_class($this))
            ->where('team_id', $teamId)
            ->exists();
    }

    public function addRoleWithStatus(
        array|string|int|Model|UuidInterface|BackedEnum $role,
        mixed $team = null,
        $status = InvitationStatus::PENDING
    ) {
        $objectType = Str::singular('roles');
        $object = Helper::getIdFor($role, $objectType);
        $this->addRole($role, $team);

        $this->roles()
            ->wherePivot(Team::modelForeignKey(), $team)
            ->updateExistingPivot($object, [
                'status' => $status,
            ]);

        return $this;
    }

    public function rolesTeams(): ?MorphToMany
    {
        if (! Config::get('laratrust.teams.enabled')) {
            return null;
        }

        return $this->morphToMany(
            Config::get('laratrust.models.team'),
            'user',
            Config::get('laratrust.tables.role_user'),
            Config::get('laratrust.foreign_keys.user'),
            Config::get('laratrust.foreign_keys.team')
        )
            ->withPivot(Config::get('laratrust.foreign_keys.role'))->wherePivot('status', InvitationStatus::ACCEPTED);
    }
}
