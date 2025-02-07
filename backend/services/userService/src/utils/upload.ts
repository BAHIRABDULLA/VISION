import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import crypto from "crypto";
import dotenv from "dotenv";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

dotenv.config();

const bucketName = process.env.S3_BUCKET_NAME;
const region = process.env.S3_BUCKET_REGION;
const accessKeyId = process.env.S3_BUCKET_ACCESS_KEY;
const secretAccessKey = process.env.S3_BUCKET_SECRET;


if (!accessKeyId || !secretAccessKey) {
    throw new Error("AWS credentials are not set");
}

const s3Client = new S3Client({
    region,
    credentials: {
        accessKeyId,
        secretAccessKey,
    },
});


    
    async function generateUploadPresignedUrl(fileName: string, fileType: string): Promise<{ url: string; fileKey: string }> {
        // const randomFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
        // const fileKey = randomFileName();
        const fileKey = fileName
        const params = {
            Bucket: bucketName,
            Key: fileKey,
            ContentType: fileType,
        };
        const command = new PutObjectCommand(params);
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return { url, fileKey };
    }


    async function generateDownloadPresignedUrl(fileKey: string): Promise<string> {
        const command = new GetObjectCommand({ Bucket: bucketName, Key: fileKey });
        const url = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        return url;
    }

    export { generateUploadPresignedUrl, generateDownloadPresignedUrl };


// import AWS from 'aws-sdk'
// import dotenv from 'dotenv'
// dotenv.config()


// const accessKey = process.env.S3_BUCKET_ACCESS_KEY
// const secretKey = process.env.S3_BUCKET_SECRET
// export const s3 = new AWS.S3({
//     accessKeyId:accessKey,
//     secretAccessKey:secretKey,
//     region:'ap-south-1',
//      signatureVersion: 'v4'
// })



// export const uploadFile = (fileContent: Buffer,fileName: string,fileType: string)=>{
//     try {
//         const params = {
//             Bucket:process.env.BUCKET_NAME!,
//             Key: fileName,
//             Body: fileContent,
//             ContentType: fileType
//         };
//         return s3.upload(params).promise()
//     } catch (error) {
//         console.error('ERror founed in upload file ++++++++',error);
//     }
   
// }