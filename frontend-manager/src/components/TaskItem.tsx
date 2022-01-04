import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "./Card";
import { Link } from "react-router-dom";

type TaskItemProps = {
    taskTitle: string;
    toPath: string;
    icon: JSX.Element;
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { taskTitle, icon, toPath } = props;
    const fillColor = useColorModeValue("grey.900", "white");

    return (
        <Card padding={3}>
            <Box as={Link} to={toPath}>
                <Flex justifyContent="center">
                    {<Box fill={fillColor}>{icon}</Box>}
                </Flex>
                <Flex direction={"column"} textAlign={"center"} marginTop={2}>
                    <Text fontWeight="semibold">{taskTitle}</Text>
                </Flex>
            </Box>
        </Card>
    );
};

export default TaskItem;
