import React from "react";
import { Flex, Text, Box, IconButton } from "@chakra-ui/react";
import { BiStore, BiChevronRight } from "react-icons/bi";
import Card from "./Card";

type SelectStoreItemProps = {
    shopTitle: string;
    callback: () => void;
};

const SelectStoreItem: React.FC<SelectStoreItemProps> = (props) => {
    const { shopTitle, callback } = props;

    return (
        <Card padding={3}>
            <Flex justifyContent="space-between" alignItems="center">
                <Flex alignItems="center">
                    <Box boxSize="32px">
                        <BiStore size={32} />
                    </Box>
                    <Flex direction={"column"}>
                        <Text fontWeight="semibold" marginX={2}>
                            {shopTitle}
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

export default SelectStoreItem;
