import React from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import UsersTable from "../components/UsersTable";

const UsersPage = () => {
    return (
        <DashboardLayout>
            <UsersTable />
        </DashboardLayout>
    );
};

export default UsersPage;
