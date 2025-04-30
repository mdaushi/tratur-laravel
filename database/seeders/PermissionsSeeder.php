<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $modules = ['products','teams'];

        $actions = ['viewAny','view', 'create', 'update', 'delete', 'restore', 'forceDelete'];

        foreach ($modules as $module) {
            $module = strtolower($module);

            foreach ($actions as $action) {
                $permName = "$module-$action";

                Permission::firstOrCreate([
                    'name' => $permName,
                    'display_name' => ucfirst($action) . ' ' . ucfirst($module),
                    'description' => ucfirst($action) . ' ' . ucfirst($module),
                ]);
            }
        }
    }
}
