<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roles = ['owner', 'member'];

        foreach ($roles as $role) {
            $data = Role::where('name', $role)->first();

            if(!$data){
                Role::create(['name' => $role]);
            }
        }
    }
}
