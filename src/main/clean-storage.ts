import {BucketItem, BucketStream, Client} from "minio"

export async function cleanStorage() {
    const MINIO_HOST = process.env.MINIO_HOST ?? ""
    const MINIO_BUCKET = process.env.MINIO_BUCKET ?? ""
    const MINIO_ACCESS_KEY = process.env.MINIO_ACCESS_KEY ?? "";
    const MINIO_SECRET_KEY = process.env.MINIO_SECRET_KEY ?? "";

    let minioClient = new Client({
        endPoint: MINIO_HOST,
        port: 9000,
        useSSL: false,
        accessKey: MINIO_ACCESS_KEY,
        secretKey: MINIO_SECRET_KEY,
    });
    let exist = await minioClient.bucketExists(MINIO_BUCKET)
    if (exist) {

        let objs = await new Promise<BucketItem[]>((res, rej)=> {
            let data: BucketItem[] = []
            let stream:BucketStream<BucketItem> =  minioClient.listObjects('wallpapers')
            stream.on('data', (obj)=> { data.push(obj) } )
            stream.on("end",  () =>{ res(data) })
            stream.on('error', (err) =>{ rej(err) } )
        })

        for (let o of objs) {
            await minioClient.removeObject(MINIO_BUCKET, o.name)
        }

        await minioClient.removeBucket(MINIO_BUCKET)
    }

    await minioClient.makeBucket(MINIO_BUCKET)
    await minioClient.setBucketPolicy(MINIO_BUCKET, police)
}


const police =`
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
                "arn:aws:s3:::wallpapers"
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
                "arn:aws:s3:::wallpapers/*"
            ]
        }
    ]
}
`