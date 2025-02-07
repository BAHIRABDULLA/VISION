import { getSignedUrl, updateCommonData } from "@/services/userApi";
import { common, commonType } from "@/utils/userValidator";
import { zodResolver } from "@hookform/resolvers/zod";
import { TextField } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const CommonProfile = ({ userData }) => {
  console.log(userData, "user data in common profile");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<commonType>({
    resolver: zodResolver(common),
    defaultValues: {
      fullName: userData?.fullName,
    },
  });
  useEffect(() => {
    console.log(errors, "errors");
  }, [errors]);

  const [selectedFile, setSelectedFile] = useState(null);
  const toggleEditNameEmail = () =>
    setIsEditingCommonData(!isEditingCommonData);

  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [isEditingCommonData, setIsEditingCommonData] = useState(false);
  const [signedUrl, setSignedUrl] = useState<string | null>(null);
  const [filekey, setFileKey] = useState<string | null>(null);
  useEffect(() => {
    const dataSetting = async () => {

      setImagePreview(userData.profile);
    };
    dataSetting();
  }, [userData, selectedFile]);
  // useEffect(() => {
  //   const dataSetting = async () => {
  //     if (!selectedFile) {
  //       if (
  //         userData?.profile &&
  //         userData.profile !==
  //           "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"
  //       ) {
  //         const filePath = userData.profile;
  //         const fileType = getFileTypeFromUrl(filePath);
  //         console.log(fileType, "file pate");

  //         const response = await getSignedUrl(filePath, fileType);

  //         if (response?.status === 200) {
  //           const { signedUrl } = response.data;
  //           setImagePreview(signedUrl);
  //         }
  //       } else {
  //         setImagePreview(userData.profile);
  //       }
  //     }
  //   };
  //   dataSetting();
  // }, [userData, selectedFile]);



  useEffect(() => {
    if (userData) {
      reset({
        fullName: userData.fullName || "",
      });
    }
  }, [userData, reset]);

  const generateSignedUrl = async (file: File) => {
    try {
      const response = await getSignedUrl(
        `profile/${Date.now()}_${file.name}`,
        file.type
      );
      if (response?.status && response.status === 200) {
        const { signedUrl, key } = response.data;
        setSignedUrl(signedUrl);
        setFileKey(key);
        return { signedUrl, key };
      } else {
        toast.error("Failed to generate signed url");
      }
    } catch (error) {
      console.error("Error founded in common data saving", error);
      toast.error("An error occurred while uploading the file");
    }
  };
  useEffect(() => {
    return () => {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
    };
  }, [imagePreview]);

  const handleChange = (e: any) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // setImagePreview(URL.createObjectURL(file));
    }

    const reader = new FileReader()
    reader.onloadend = () => {
        setImagePreview(reader.result as string)
    }
    reader.readAsDataURL(file)
  };

  const handleCommonDataSubmit = async (data: commonType) => {
    try {
      // if (selectedFile && signedUrl) {
      if (selectedFile) {
        const signedUrlData = await generateSignedUrl(selectedFile);
        // setUploading(true);
        if (!signedUrlData) {
          toast.error("Failed to get signed URL");
          return;
        }
        const { signedUrl, key } = signedUrlData;

        const uploadImageToS3 = await axios.put(signedUrl, selectedFile, {
          headers: { "Content-Type": selectedFile.type },
        });
        if (uploadImageToS3.status >= 400) {
          toast.error(uploadImageToS3.data.message || "An error occured");
          return;
        }
        // setUploading(false);
        // uploadedFileKey = filekey;
        data.fileKey = key;
      } else {
        data.fileKey = userData.profile;
      }
      // const formData = new FormData();
      // formData.append('fullName', data.fullName);
      // if (uploadedFileKey) formData.append('fileKey', uploadedFileKey);

      const response = await updateCommonData(data);
      if (response?.data.success) {
        toast.success("Data updated successfully.");
        setIsEditingCommonData(false);
      } else {
        toast.error("Failed to update data.");
      }
    } catch (error) {
      console.error("Error updating common data:", error);
      toast.error("An error occurred while saving changes.");
      // setUploading(false);
    }
  };
  const getFileTypeFromUrl = (url) => {
    const fileExtension = url.split(".").pop();
    console.log(fileExtension, "file extions");

    switch (fileExtension.toLowerCase()) {
      case "jpg":
      case "jpeg":
        return "image/jpeg";
      case "png":
        return "image/png";
      default:
        return "application/octet-stream";
    }
  };
  return (
    <>
      <form key={1} onSubmit={handleSubmit(handleCommonDataSubmit)}>
        <div className="flex flex-col items-center mb-6">
          <div className="w-32 h-32 bg-gray-200 dark:bg-gray-700 rounded-full mb-4 flex items-center justify-center text-gray-400 dark:text-gray-300">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile"
                className="w-full h-full object-cover rounded-full"
              />
            ) : (
              <span>No Image</span>
            )}
          </div>
          <input
            type="file"
            onChange={handleChange}
            accept="image/*"
            hidden={!isEditingCommonData}
            className={`block  p-2 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 ${!isEditingCommonData ? "hidden" : "block"
              }`}
          />
        </div>

        {/* Full Name & Email Section */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <TextField
              label="Full Name"
              defaultValue={userData?.fullName || ""}
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
              disabled={!isEditingCommonData}
              {...register("fullName")}
            />
            {errors.fullName && (
              <p className="text-red-500">{errors.fullName.message}</p>
            )}
          </div>
          <div>
            <TextField
              label="Email"
              defaultValue={userData?.email}
              disabled
              variant="filled"
              fullWidth
              sx={{
                backgroundColor: "white",
                borderRadius: "8px",
              }}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          {isEditingCommonData ? (
            <div className="flex gap-2">
              <button
                type="submit"
                // disabled={uploading}
                className="bg-gray-500 dark:bg-gray-700 px-7 py-1 rounded-md text-white mb-6"
              >
                Save
              </button>
              <button
                type="button"
                onClick={toggleEditNameEmail}
                className="bg-gray-500 dark:bg-gray-700 px-7 py-1 rounded-md text-white mb-6"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={toggleEditNameEmail}
              className="bg-gray-500 dark:bg-gray-700 px-7 py-1 rounded-md text-white mb-6"
            >
              Edit
            </button>
          )}
        </div>
      </form>
    </>
  );
};

export default CommonProfile;
