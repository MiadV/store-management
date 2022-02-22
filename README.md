# Store Management App

Store management app is a customized web app for managing multiple shops sales and expenses.
it consists of 2 differnt modules:

1. **Accounting Module:** used to generate reports and manage shop managers/supervisors.
2. **Manager Module:** will be used by shop managers / supervisors to report sales and expenses.

## Running Locally / Seeding

### Setup Backend:

This project uses [Laravel framework](https://laravel.com/) in backend.

-   Create a database and Config DB Credentials in .env file.(defaults to MySQL)
-   Run `php artisan migrate:fresh --seed`.
-   Define token expiration time in `config/sanctum.php`.
-   Edit app specific variables in `config/constants.php`.

Initial roles and permissions can be modified from `database/seeders/PermissionsSeeder.php`

**Current permissions are:**

-   SALES_REPORT
-   EXPENSE_REPORT
-   REPORT_HISTORY
-   ACCOUNTING_MODULE

### Setup Frontend:

This project uses [React-js](https://reactjs.org/) in frontend.

1. [Accounting Module](./frontend-accounting/)
1. [Managers Module](./frontend-manager/)

## API Endpoints

> TODO: Add params to docs.

### General

**Authentication:**

-   POST `api/v1/login` authenticate user.
-   POST\* `api/v1/logout` logout auth user.
-   GET\* `api/v1/me` get auth users information.

**Sales:**

-   GET\* `api/v1/sale/latest/{shop_id}` get the latest sales report.
-   GET\* `api/v1/sale/{sale_id}` get sales report by id.
-   POST\* `api/v1/sale` new sales report.
-   PUT\* `api/v1/sale/{report_id}` update sales report.

**Expense:**

-   GET\* `api/v1/expense/types/{shop_id}` get expense types list for a shop.
-   GET\* `api/v1/expense/limit-balance/{expense_type_shop_id}` get balance of expense type for the current month.
-   GET\* `api/v1/expense/current-month/{shop_id}` get expense reports list for the current month.
-   GET\* `api/v1/expense/{report_id}` get expense by id.
-   POST\* `api/v1/expense` new expense report.
-   PUT\* `api/v1/expense/{report_id}` update expense report.

**Upload:**

-   POST\* `api/v1/upload/image` upload photos.
-   DELETE\* `api/v1/upload/image` delete photos by passing array of ids.

### Accounting Dashboard Only

-   POST `api/v1/accountant/login` authenticate accountant only.
-   GET\* `api/v1/accountant/permissions` list all permission types.

**Shops:**

-   GET\* `api/v1/accountant/shops` list all shops.
-   GET\* `api/v1/accountant/user` list all users.
-   POST\* `api/v1/accountant/user` add new user.
-   PUT\* `api/v1/accountant/user/{userId}` update user info.

**Sales:**

-   GET\* `api/v1/accountant/sales` paginated sales list.
-   PUT\* `api/v1/accountant/sales/{reportId}` update sale report.

**Expense:**

-   GET\* `api/v1/accountant/expense-type` list all expense types.
-   POST\* `api/v1/accountant/expense-type` add new expense type.
-   POST\* `api/v1/accountant/expense-type/assign` assign expense-type to a shop.
-   GET\* `api/v1/accountant/expense` paginated sales list.
-   PUT\* `api/v1/accountant/expense/{reportId}` update sale report.

**Reports:**

-   GET\* `api/v1/accountant/sales/export` export sales reports as xlsx file.
-   GET\* `api/v1/accountant/sales/export/json` export sales reports as json.
-   GET\* `api/v1/accountant/expense/export` export expense reports as xlsx file.
-   GET\* `api/v1/accountant/expense/export/json` export expense reports as json.

### Social Media

<p align="center">
    <a href="https://www.buymeacoffee.com/miad" alt="buymeacoffee">
        <img src="https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=flat&logo=buy-me-a-coffee&logoColor=black" />
    </a>
    <a href="mailto:miadv.biz@gmail.com" alt="gmail">
    <a href="https://www.linkedin.com/in/miad-vosoughi" alt="LinkedIn">
        <img src="https://img.shields.io/badge/LinkedIn-%230077B5.svg?style=flat&logo=linkedin&logoColor=white" />
    </a>
    <a href="mailto:miadv.biz@gmail.com" alt="gmail">
        <img src="https://img.shields.io/badge/Gmail-D14836.svg?style=flat&logo=gmail&logoColor=white" />
    </a>
    <a href="https://twitter.com/Miad_Vosoughi" alt="twitter">
        <img src="https://img.shields.io/badge/Twitter-%231DA1F2.svg?style=flat&logo=twitter&logoColor=white" />
    </a>
    <a href="https://www.youtube.com/c/MiadVosoughi" alt="youtube">
        <img src="https://img.shields.io/badge/Youtube-%23FF0000.svg?style=flat&logo=youTube&logoColor=white" />
    </a>
    <a href="https://www.instagram.com/miadv.dev" alt="instagram">
        <img src="https://img.shields.io/badge/Instagram-%23E4405F.svg?style=flat&logo=instagram&logoColor=white" />
    </a>
</p>
