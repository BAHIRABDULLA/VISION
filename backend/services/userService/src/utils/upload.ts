import AWS from 'aws-sdk'
import dotenv from 'dotenv'
dotenv.config()


const accessKey = process.env.S3_BUCKET_ACCESS_KEY
const secretKey = process.env.S3_BUCKET_SECRET
const s3 = new AWS.S3({
    accessKeyId:accessKey,
    secretAccessKey:secretKey,
    region:'ap-south-1'
})



export const uploadFile = (fileContent: Buffer,fileName: string,fileType: string)=>{
    try {
        const params = {
            Bucket:process.env.BUCKET_NAME!,
            Key: fileName,
            Body: fileContent,
            ContentType: fileType
        };
        return s3.upload(params).promise()
    } catch (error) {
        console.error('ERror founed in upload file ++++++++',error);
    }
   
}
     // ACL:'public-read'








// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
// import dotenv from 'dotenv';

// dotenv.config();

// const accessKey = process.env.S3_BUCKET_ACCESS_KEY!;
// const secretKey = process.env.S3_BUCKET_SECRET!;
// const bucketName = process.env.BUCKET_NAME!;

// // Create an S3 client
// const s3Client = new S3Client({
//     region: 'ap-south-1',
//     credentials: {
//         accessKeyId: accessKey,
//         secretAccessKey: secretKey,
//     },
// });

// // Set up multer for file uploads


// export const uploadFileToS3 = async (file: Express.Multer.File) => {
//     const fileName = `uploads/${Date.now()}_${file.originalname}`;
    
//     const uploadParams = {
//         Bucket: bucketName,
//         Key: fileName,
//         Body: file.buffer, 
//         ContentType: file.mimetype,
//     };

//     const command = new PutObjectCommand(uploadParams);
//     await s3Client.send(command);
    
//     // Return the S3 file URL
//     return `https://${bucketName}.s3.amazonaws.com/${fileName}`;
// };