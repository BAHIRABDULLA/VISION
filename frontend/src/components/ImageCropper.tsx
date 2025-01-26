import React, { useState } from "react";
import Cropper from 'react-easy-crop'
import { Button } from "@mui/material";
import { useImageCrop } from "@/hooks/useImageCrop";




interface ImageCropperProps {
    imageSrc: string;
    onCropComplete: (croppedBlob: Blob) => void;
    aspectRatio?: number;
  }
  
  const ImageCropper: React.FC<ImageCropperProps> = ({ imageSrc, onCropComplete, aspectRatio = 1 }) => {
    const { crop, setCrop, zoom, setZoom, onCropComplete: handleCropComplete, getCroppedImage } =
      useImageCrop();
  
    const [loading, setLoading] = useState(false);
  
    const handleCrop = async () => {
      setLoading(true);
      const croppedBlob = await getCroppedImage(imageSrc);
      setLoading(false);
  
      if (croppedBlob) {
        onCropComplete(croppedBlob);
      }
    };
  
    return (
      <div className="relative w-full h-[400px] bg-gray-200">
        <Cropper
          image={imageSrc}
          crop={crop}
          zoom={zoom}
          aspect={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={handleCropComplete}
        />
        <div className="flex justify-center mt-4">
          <Button variant="contained" onClick={handleCrop} disabled={loading}>
            {loading ? "Processing..." : "Crop & Save"}
          </Button>
        </div>
      </div>
    );
  };
  
  export default ImageCropper;
  