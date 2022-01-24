import React from "react";
import {
    Avatar,
    Box,
    Flex,
    Heading,
    IconButton,
    Stack,
    Text,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import { BiHomeAlt } from "react-icons/bi";
import Card from "./Card";
import SettingMenu from "./SettingMenu";

type HeaderProps = {
    title: string;
    showSetting?: boolean;
};

const Header: React.FC<HeaderProps> = (props) => {
    const { title, showSetting } = props;

    return (
        <div style={{ marginBottom: "150px" }}>
            <Card
                borderTopRadius={0}
                borderBottomRadius={16}
                boxShadow="md"
                padding={6}
                position={"fixed"}
                inset={"0 0 auto 0"}
                height={"150px"}
            >
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                    <Box>
                        <Avatar size={"md"} boxShadow={"md"} />
                    </Box>
                    <Stack spacing={1} direction="row">
                        <Link to="/">
                            <IconButton
                                variant="ghost"
                                isRound
                                aria-label="dashboard"
                                icon={<BiHomeAlt size={32} />}
                            />
                        </Link>

                        {showSetting && <SettingMenu />}
                    </Stack>
                </Flex>
                <Heading as="h4" fontSize="md" marginTop={4}>
                    {title}
                </Heading>
                <Text>{format(new Date(), "EEEE, do LLLL yy")}</Text>
            </Card>
        </div>
    );
};

export default Header;

Header.defaultProps = {
    showSetting: true,
};
