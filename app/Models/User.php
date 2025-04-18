<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;
use Laratrust\Contracts\LaratrustUser;
use Laratrust\Traits\HasRolesAndPermissions;

class User extends Authenticatable implements LaratrustUser
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
         // Prioritaskan team dari session
         $teamId = session('current_team_id');

         // Jika tidak ada di session, gunakan current_team_id dari database
         if (!$teamId) {
             $teamId = $this->current_team_id;

             // Jika current_team_id juga tidak ada, gunakan default_team_id
             if (!$teamId) {
                 $teamId = $this->default_team_id;
             }

             // Jika ditemukan team ID dari database, update session
             if ($teamId) {
                 session(['current_team_id' => $teamId]);
             }
         }

         return $teamId;
     }

     public function currentTeam()
     {
         $teamId = $this->getCurrentTeamId();

         if ($teamId) {
             return Team::find($teamId);
         }

         return null;
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
}
