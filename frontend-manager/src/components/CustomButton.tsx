import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { BiChevronRight } from "react-icons/bi";
import Card from "./Card";

type CustomButtonProps = {
    title: string;
    callback: () => void;
    icon?: JSX.Element;
};

const CustomButton: React.FC<CustomButtonProps> = (props) => {
    const { title, callback, icon } = props;

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
                    onClick={callback}
                    icon={<BiChevronRight size={24} />}
                />
            </Flex>
        </Card>
    );
};

export default CustomButton;
