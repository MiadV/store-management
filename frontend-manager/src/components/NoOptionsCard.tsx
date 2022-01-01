import react from "react";
import { Heading, Text, Flex, useColorModeValue, Box } from "@chakra-ui/react";
import AlertIcon from "../assets/vectors/AlertIcon";
import Card from "./Card";

type NoOptionsCardPropsType = { title: string; subtitle: string };

const NoOptionsCard: React.FC<NoOptionsCardPropsType> = (props) => {
    const { title, subtitle } = props;
    const bgColor = useColorModeValue("gray.900", "white");

    return (
        <Card marginTop={4} padding={3}>
            <Flex marginBottom={1} justifyContent={"center"}>
                <Box bg={"orange.200"} borderRadius={50} padding={4}>
                    <AlertIcon fill={bgColor} />
                </Box>
            </Flex>
            <Heading as="h4" size="md" textAlign="center">
                {title}
            </Heading>
            <Text fontSize="lg" textAlign="center">
                {subtitle}
            </Text>
        </Card>
    );
};

export default NoOptionsCard;
