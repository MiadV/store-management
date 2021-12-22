## Deployment

- Create the database and Config DB Credentials in .env file.
- Run `php artisan migrate:fresh --seed`.

## Initial Setup

- Define token expiration time in config/sanctum.php
- Initial roles and permissions can be modified from database/seeders/PermissionsSeeder.php




