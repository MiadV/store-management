## Deployment

- Create the database and Config DB Credentials in .env file.
- Run `php artisan migrate:fresh --seed`.
- Define token expiration time in `config/sanctum.php`.
- Edit app specific variables in `config/constants.php`.

## Developer Notes

Initial roles and permissions can be modified from `database/seeders/PermissionsSeeder.php`

#### Current permissions are:
- sales-report
- expense-report
- report-history


## API Endpoints
#### General 

Authentication:
- POST `api/v1/login` authenticate user.
- POST* `api/v1/logout` logout auth user.
- GET* `api/v1/me` get auth users information.

Sales:
- GET* `api/v1/sale/latest/{shop_id}` get the latest sales report.
- GET* `api/v1/sale/{sale_id}` get sales report by id.
- POST* `api/v1/sale` new sales report.
- PUT* `api/v1/sale/{report_id}` update sales report.

Expense:
- GET* `api/v1/expense/types/{shop_id}` get expense types list for a shop.
- GET* `api/v1/expense/limit-balance/{expense_type_shop_id}` get balance of expense type for the current month.
- GET* `api/v1/expense/current-month/{shop_id}` get expense reports list for the current month.
- GET* `api/v1/expense/{report_id}` get expense by id.
- POST* `api/v1/expense` new expense report.
- PUT* `api/v1/expense/{report_id}` update expense report.

Upload:
- POST* `api/v1/upload/image` upload photos.
- DELETE* `api/v1/upload/image` delete photos by passing aray of ids.

#### Accounting Dashboard Only
- Modify users
- Modify shops
- Modify expense types
- Link expense types with shops
- Reports
