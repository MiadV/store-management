import { useMutation } from "react-query";
import { ImageUploadResponse } from "../types";
import api from "../util/api";

const uploadImage = async (data: File): Promise<ImageUploadResponse> => {
    const formData = new FormData();
    formData.append("image", data);

    return await api().post("/upload/image", formData, {
        headers: { "Content-type": "multipart/form-data" },
    });
};

const deleteImageById = async (
    imageIds: number[] | string[]
): Promise<boolean> => {
    return await api().delete(`/upload/image`, { data: { ids: imageIds } });
};

export function useUploadImageMutation() {
    return useMutation<ImageUploadResponse, any, File>(async (data) =>
        uploadImage(data)
    );
}

export function useDeleteImageMutation() {
    return useMutation<boolean, any, number[] | string[]>(async (imageIds) =>
        deleteImageById(imageIds)
    );
}
