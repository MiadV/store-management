## Deployment

- Create the database and Config DB Credentials in .env file.
- Run `php artisan migrate:fresh --seed`.
- Define token expiration time in config/sanctum.php

## Developer Notes

Initial roles and permissions can be modified from `database/seeders/PermissionsSeeder.php`
####Current permissions are:
- sales-report
- expense-report
- report-history


