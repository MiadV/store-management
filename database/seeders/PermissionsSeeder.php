<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Models\Role;
use Spatie\Permission\PermissionRegistrar;

class PermissionsSeeder extends Seeder
{
    /**
     * Create the initial roles and permissions.
     *
     * @return void
     */
    public function run()
    {
        // Reset cached roles and permissions
        app()[PermissionRegistrar::class]->forgetCachedPermissions();

        // create permissions
        Permission::create(['name' => 'sales-report']);
        Permission::create(['name' => 'expense-report']);
        Permission::create(['name' => 'report-history']);

        // create roles and assign existing permissions
//        $roleSuperAdmin = Role::create(['name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create demo users
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);
        $user->givePermissionTo('sales-report', 'expense-report');


        $user = User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@test.com',
        ]);
        $user->givePermissionTo('sales-report', 'expense-report', 'report-history');

//        $user = User::factory()->create([
//            'name' => 'Example Super-Admin User',
//            'email' => 'superadmin@example.com',
//        ]);
//        $user->assignRole($roleSuperAdmin);
    }
}
