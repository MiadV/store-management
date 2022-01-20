import React, { ChangeEvent, useRef, useState, useEffect } from 'react';
import {
  Box,
  Button,
  Flex,
  IconButton,
  Image,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { BiTrash, BiUpload } from 'react-icons/bi';
import { useDeleteImageMutation, useUploadImageMutation } from '../hooks/useImageMutation';
import { ImageType, ResponseErrorType, uploadedImageType } from '../types';

const CustomImageUpload: React.FC<{
  setImageIds: React.Dispatch<React.SetStateAction<number[] | string[]>>;
  initialImages?: ImageType[];
}> = ({ setImageIds, initialImages }) => {
  const toast = useToast();
  const bgColor = useColorModeValue('white', 'gray.700');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadedFiles, setUploadedFiles] = useState<uploadedImageType[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);

  const uploadImage = useUploadImageMutation();
  const deleteImage = useDeleteImageMutation();

  // TODO if user leaves the form and doesnt submit the data we need to delete uploaded images.

  useEffect(() => {
    let initImages = initialImages?.map((i) => ({ dataUrl: i.fullPath, imageId: i.imageId }));
    if (initImages) {
      setUploadedFiles(initImages);
    }
  }, [setUploadedFiles, initialImages]);

  useEffect(() => {
    let uploadedImageIds = uploadedFiles.map((i) => i.imageId);
    setImageIds(uploadedImageIds);
  }, [uploadedFiles, setImageIds]);

  const handleFileInput = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      let file = e.target.files[0];

      try {
        setIsProcessing(true);
        await uploadImage.mutateAsync(file).then((res) => {
          const reader = new FileReader();
          reader.addEventListener('load', () => {
            let result = reader.result?.toString();
            if (result) {
              setUploadedFiles([
                ...uploadedFiles,
                {
                  dataUrl: result,
                  imageId: typeof res.data.id === 'string' ? parseInt(res.data.id) : res.data.id,
                },
              ]);
            }
          });
          reader.readAsDataURL(file);

          setIsProcessing(false);
        });
      } catch (err) {
        const { response } = err as ResponseErrorType;

        if (response?.data.errors.image) {
          let message = response?.data.errors.image[0];
          toast({
            title: 'Upload Error',
            description: `${message}`,
            status: 'error',
            duration: 4000,
            isClosable: true,
          });
        } else {
          toast({
            title: 'Upload Error',
            description: 'Please try again.',
            status: 'error',
            duration: 3000,
            isClosable: true,
          });
        }

        setIsProcessing(false);
      }
    }
  };

  const handleDeleteImage = async (imageId: number) => {
    try {
      setIsProcessing(true);
      await deleteImage.mutateAsync([imageId]).then(() => {
        const filtredList = uploadedFiles.filter((i) => i.imageId !== imageId);

        setUploadedFiles(filtredList);
      });

      setIsProcessing(false);
    } catch (err) {
      setIsProcessing(false);
      toast({
        title: 'Upload Error',
        description: 'Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Flex wrap="wrap" gap={2}>
      <>
        <input
          type="file"
          accept="image/*"
          aria-label="upload image"
          hidden={true}
          ref={fileInputRef}
          onChange={handleFileInput}
        />
        <Button
          bg={bgColor}
          boxSize="70px"
          justifyContent="center"
          alignItems="center"
          borderRadius={5}
          border="2px dashed"
          aria-label="upload image"
          onClick={() => fileInputRef.current!.click()}
          isLoading={isProcessing}
        >
          <BiUpload size={40} />
        </Button>
      </>

      {uploadedFiles.length > 0 &&
        uploadedFiles.map((image) => (
          <PreviewImageItem
            key={image.imageId}
            image={image}
            onDelete={handleDeleteImage}
            isDeleting={isProcessing}
          />
        ))}
    </Flex>
  );
};

export default CustomImageUpload;

const PreviewImageItem: React.FC<{
  image: uploadedImageType;
  onDelete: (id: number) => void;
  isDeleting: boolean;
}> = ({ image, isDeleting, onDelete }) => {
  return (
    <Box position="relative">
      <Image
        src={image.dataUrl}
        alt="receipt"
        boxSize="70px"
        boxShadow="md"
        objectFit="cover"
        loading="lazy"
        borderRadius={5}
      />

      <IconButton
        aria-label="remove image"
        icon={<BiTrash size={18} />}
        position={'absolute'}
        bottom={-1}
        right={-1}
        isRound
        size="sm"
        colorScheme={'red'}
        isLoading={isDeleting}
        onClick={() => onDelete(image.imageId)}
      />
    </Box>
  );
};
