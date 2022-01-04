import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import Card from "./Card";
import { Link } from "react-router-dom";

type CustomLinkProps = {
    title: string;
    toPath: string;
    icon?: JSX.Element;
};

const CustomLink: React.FC<CustomLinkProps> = (props) => {
    const { title, toPath, icon } = props;

    return (
        <Card padding={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    {icon && <Box boxSize="32px">{icon}</Box>}
                    <Flex direction={"column"}>
                        <Text fontWeight="semibold" marginX={2}>
                            {title}
                        </Text>
                    </Flex>
                </Flex>

                <IconButton
                    variant="outline"
                    aria-label="select store"
                    size="sm"
                    to={toPath}
                    as={Link}
                    icon={<BiChevronRight size={24} />}
                />
            </Flex>
        </Card>
    );
};

export default CustomLink;
