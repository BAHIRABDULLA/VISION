import { useState } from "react";
import getCroppedImg from "@/utils/cropImageUtil";

export const useImageCrop = () => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);

    const onCropComplete = (_croppedArea: any, croppedAreaPixels: any) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const getCroppedImage = async (imageSrc: string): Promise<Blob | null> => {
        try {
            if (!croppedAreaPixels) return null;
            return await getCroppedImg(imageSrc, croppedAreaPixels);
        } catch (error) {
            console.error("Error cropping image:", error);
            return null;
        }
    };

    return {
        crop,
        setCrop,
        zoom,
        setZoom,
        onCropComplete,
        getCroppedImage,
    };
};