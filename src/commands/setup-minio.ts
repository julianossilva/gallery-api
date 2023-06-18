import { Client } from "minio"

const MINIO_HOST = process.env.MINIO_HOST ?? ""
const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ""
const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "";
const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "";


const police = `
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetBucketLocation",
                "s3:ListBucket"
            ],
            "Resource": [
                "arn:aws:s3:::${MINIO_BUCKET}"
            ]
        },
        {
            "Effect": "Allow",
            "Principal": {
                "AWS": [
                    "*"
                ]
            },
            "Action": [
                "s3:GetObject"
            ],
            "Resource": [
                "arn:aws:s3:::${MINIO_BUCKET}/*"
            ]
        }
    ]
}
`

export async function setup() {

    let minioClient = new Client({
        endPoint: MINIO_HOST,
        port: 9000,
        useSSL: false,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });

    let exist = await minioClient.bucketExists(MINIO_BUCKET)
    if (!exist) {
        await minioClient.makeBucket(MINIO_BUCKET)
        await minioClient.setBucketPolicy(MINIO_BUCKET, police)
    }

}

setup()