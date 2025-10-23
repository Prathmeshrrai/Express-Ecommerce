import S3 from "../config/S3.config";

export const S3FileUpload = async ({bucketName, key, body, contentType})=>{
    return await S3.upload({
        Bucket: bucketName,
        key: key,
        Body: body,
        ContentType : contentType
    }).promise()
}

export const S3deleteFile = async ({bucketName, key}) =>{
    return await S3.deleteObject({
        Bucket: bucketName,
        Key: key,
    })
    .promise()
}