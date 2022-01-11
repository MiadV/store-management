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


        // define permissions
        $sales_report = "SALES_REPORT";
        $expense_report = "EXPENSE_REPORT";
        $report_history = "REPORT_HISTORY";
        $accounting_module = "ACCOUNTING_MODULE";

        // create permissions
        Permission::create(['name' => $sales_report]);
        Permission::create(['name' => $expense_report]);
        Permission::create(['name' => $report_history]);
        Permission::create(['name' => $accounting_module]);

        // create roles and assign existing permissions
//        $roleSuperAdmin = Role::create(['name' => 'Super-Admin']);
        // gets all permissions via Gate::before rule; see AuthServiceProvider

        // create some users
        $user = User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@test.com',
        ]);
        $user->givePermissionTo($sales_report, $expense_report, $accounting_module);


        $user = User::factory()->create([
            'name' => 'Test User 2',
            'email' => 'test2@test.com',
        ]);
        $user->givePermissionTo($sales_report, $expense_report, $report_history);

//        $user = User::factory()->create([
//            'name' => 'Example Super-Admin User',
//            'email' => 'superadmin@example.com',
//        ]);
//        $user->assignRole($roleSuperAdmin);
    }
}
