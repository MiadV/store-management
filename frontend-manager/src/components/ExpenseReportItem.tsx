import React, { useState } from "react";
import {
    Box,
    Flex,
    IconButton,
    Image,
    Text,
    useColorModeValue,
} from "@chakra-ui/react";
import { format } from "date-fns";
import { Link } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import ReportCheckIcon from "../assets/vectors/ReportCheckIcon";
import { ExpenseReportType } from "../types";
import currencyFormat from "../util/currencyFormat";
import ImagePreviewModal from "./ImagePreviewModal";

const ExpenseReportItem: React.FC<{ report: ExpenseReportType }> = ({
    report,
}) => {
    const bgColor = useColorModeValue("gray.200", "gray.700");
    const { reportDate, shop, description, amount, expenseType, images, user } =
        report;

    return (
        <Box>
            <Flex alignItems={"center"}>
                <Link to="/expenses" replace={true}>
                    <IconButton
                        variant="ghost"
                        isRound
                        aria-label="Go back one page"
                        icon={<BiArrowBack size={32} />}
                    />
                </Link>
            </Flex>
            <Flex justifyContent="center" marginY={8}>
                <Flex
                    bg="teal.400"
                    width="130px"
                    height="130px"
                    borderRadius="100%"
                    justifyContent="center"
                    alignItems="center"
                >
                    <ReportCheckIcon fill="white" width="80px" />
                </Flex>
            </Flex>
            <Flex
                direction="column"
                textAlign="center"
                padding={4}
                borderRadius={8}
                bg={bgColor}
            >
                <Flex direction="column" gap={1}>
                    <Flex justifyContent={"center"}>
                        <Text fontWeight={"bold"} fontSize="2xl">
                            {currencyFormat(amount)}
                        </Text>
                    </Flex>

                    <Flex justifyContent={"space-between"}>
                        <Text>Store</Text>
                        <Text>{shop?.title}</Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Type</Text>
                        <Text>{expenseType.title}</Text>
                    </Flex>

                    <Flex justifyContent={"space-between"}>
                        <Text>Date</Text>
                        <Text>
                            {format(new Date(reportDate), "dd MMMM yyyy")}
                        </Text>
                    </Flex>
                    <Flex justifyContent={"space-between"}>
                        <Text>Added By</Text>
                        <Text>{user?.name}</Text>
                    </Flex>

                    {description && (
                        <Flex direction={"column"}>
                            <Text fontWeight={"bold"}>Notes</Text>
                            <Text alignSelf={"start"}>{description}</Text>
                        </Flex>
                    )}

                    {images.length !== 0 && (
                        <Flex marginTop={4} direction={"column"}>
                            <Text fontWeight={"bold"}>Attachments</Text>
                            <Box marginTop={2}>
                                <RenderImageItems imageList={images} />
                            </Box>
                        </Flex>
                    )}
                </Flex>
            </Flex>
        </Box>
    );
};

export default ExpenseReportItem;

const RenderImageItems: React.FC<{ imageList: string[] }> = ({ imageList }) => {
    const [src, setSrc] = useState<string | null>(null);

    function openModal(image: string) {
        setSrc(image);
    }

    function closeModal() {
        setSrc(null);
    }

    const items = imageList.map((image, i) => (
        <Image
            key={i}
            src={image}
            alt="receipt"
            boxSize="70px"
            boxShadow="md"
            objectFit="cover"
            loading="lazy"
            borderRadius={5}
            cursor="pointer"
            onClick={() => openModal(image)}
        />
    ));
    return (
        <>
            <Flex gap={4}>{items}</Flex>
            <ImagePreviewModal imageSrc={src} onClose={closeModal} />
        </>
    );
};
