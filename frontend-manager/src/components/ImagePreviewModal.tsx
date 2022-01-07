import React from "react";
import {
    Image,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    useBreakpointValue,
} from "@chakra-ui/react";

const ImagePreviewModal: React.FC<{
    imageSrc: string | null;
    onClose: () => void;
}> = ({ imageSrc, onClose }) => {
    const modealSize = useBreakpointValue({ base: "xs", sm: "xl" });
    return (
        <Modal
            isOpen={!!imageSrc}
            onClose={onClose}
            isCentered
            scrollBehavior="outside"
            size={modealSize}
        >
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton
                    bg={"teal.700"}
                    color={"white"}
                    opacity={0.6}
                />
                <ModalBody>
                    {imageSrc && (
                        <Image
                            src={imageSrc}
                            alt="receipt"
                            loading="lazy"
                            width={"100%"}
                        />
                    )}
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};

export default ImagePreviewModal;
