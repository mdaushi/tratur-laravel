<?php

namespace Database\Seeders;

use App\Models\Permission;
use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $rolePermissions = [
            'owner' => [
                [
                    'module' => 'teams',
                    'actions' => ['view', 'create', 'update', 'delete']
                ],
            ],
            'member' => [
                [
                    'module' => 'teams',
                    'actions' => ['view', 'create', 'update', 'delete']
                ],
            ],
        ];

        foreach ($rolePermissions as $roleName => $permissions) {
            $role = Role::where('name', $roleName)->first();
            if (! $role) continue;

            $permissionNames = [];

            foreach ($permissions as $item) {
                foreach ($item['actions'] as $action) {
                    $permissionNames[] = "{$item['module']}-{$action}";
                }
            }

            $permissionIds = Permission::whereIn('name', $permissionNames)->pluck('id')->toArray();
            $role->permissions()->sync($permissionIds);
        }
    }
}
