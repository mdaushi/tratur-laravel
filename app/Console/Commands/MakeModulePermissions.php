<?php

namespace App\Console\Commands;

use App\Models\Permission;
use Illuminate\Console\Command;

class MakeModulePermissions extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'make:permissions {module}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Generate view, create, edit, delete permissions for a module';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $module = strtolower($this->argument('module'));
        $actions = ['view', 'create', 'edit', 'delete'];

        foreach ($actions as $action) {
            $permName = "$module-$action";

            $permission = Permission::firstOrCreate([
                'name' => $permName,
                'display_name' => ucfirst($action) . ' ' . ucfirst($module),
                'description' => ucfirst($action) . ' ' . ucfirst($module),
            ]);

            if ($permission->wasRecentlyCreated) {
                $this->info("Created permission: $permName");
            } else {
                $this->warn("Permission already exists: $permName");
            }
        }

        return 0;
    }
}
