import React from "react";
import { Box, Flex, Text, useColorModeValue } from "@chakra-ui/react";
import Card from "./Card";

type TaskItemProps = {
    taskTitle: string;
    callback: () => void;
    icon: JSX.Element;
};

const TaskItem: React.FC<TaskItemProps> = (props) => {
    const { taskTitle, icon, callback } = props;
    const fillColor = useColorModeValue("grey.900", "white");

    return (
        <Card padding={3} onClick={callback} as={"button"}>
            <Flex justifyContent="center">
                {<Box fill={fillColor}>{icon}</Box>}
            </Flex>
            <Flex direction={"column"} textAlign={"center"} marginTop={2}>
                <Text fontWeight="semibold">{taskTitle}</Text>
            </Flex>
        </Card>
    );
};

export default TaskItem;
