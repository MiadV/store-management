import react from "react";
import {
    Menu,
    MenuButton,
    IconButton,
    MenuList,
    MenuItem,
} from "@chakra-ui/react";
import { BiCog } from "react-icons/bi";
import useLogoutMutation from "../hooks/useLogoutMutation";
import { useNavigate } from "react-router-dom";

const SettingMenu = () => {
    let navigate = useNavigate();
    const logoutMutation = useLogoutMutation();

    async function handleLogout() {
        await logoutMutation.mutateAsync(null);
        navigate("/login");
    }

    return (
        <Menu>
            <MenuButton
                as={IconButton}
                aria-label="Options"
                icon={<BiCog size={32} />}
                variant="ghost"
                isRound
            />
            <MenuList>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </MenuList>
        </Menu>
    );
};

export default SettingMenu;
