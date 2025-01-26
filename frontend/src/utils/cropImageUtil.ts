export default function getCroppedImg(imageSrc: string, croppedAreaPixels: any): Promise<Blob | null> {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = imageSrc;
      image.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
  
        if (!ctx) {
          reject("Canvas context not found");
          return;
        }
  
        canvas.width = croppedAreaPixels.width;
        canvas.height = croppedAreaPixels.height;
  
        ctx.drawImage(
          image,
          croppedAreaPixels.x,
          croppedAreaPixels.y,
          croppedAreaPixels.width,
          croppedAreaPixels.height,
          0,
          0,
          croppedAreaPixels.width,
          croppedAreaPixels.height
        );
  
        canvas.toBlob((blob) => {
          resolve(blob);
        }, "image/jpeg");
      };
  
      image.onerror = (error) => reject(error);
    });
  }
  