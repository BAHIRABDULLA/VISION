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