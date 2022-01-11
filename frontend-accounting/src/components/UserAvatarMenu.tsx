import React from "react";
import {
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Avatar,
    MenuButtonProps,
    AvatarProps,
} from "@chakra-ui/react";

import { useLogoutMutation } from "../hooks/useAuth";

import useAuth from "../hooks/useAuth";

const UserAvatarMenu: React.FC<MenuButtonProps & AvatarProps> = (props) => {
    let { data } = useAuth();

    const logoutMutation = useLogoutMutation();

    async function handleLogout() {
        await logoutMutation.mutateAsync(null);
    }

    return (
        <Menu>
            <MenuButton
                as={Avatar}
                aria-label="User options menu"
                size="sm"
                name={data?.name}
                src=""
                boxShadow="sm"
                cursor="pointer"
                d="block"
                {...props}
            />
            <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default UserAvatarMenu;
