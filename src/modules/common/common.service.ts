import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { v1 as uuidv1 } from 'uuid'
import { config } from 'dotenv'
config()

console.log(process.env.AWS_ACCESS_KEY_ID, process.env.AWS_SECRET_ACCESS_KEY)
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
})

const S3 = new AWS.S3({ signatureVersion: 'v4', region: 'ap-northeast-2' })

@Injectable()
export class CommonService {
  constructor() {}

  public async getUploadUrl(ext: string) {
    const fileName = uuidv1() + '.' + ext
    const fullPath = `uploads/${fileName}`

    const Bucket = 'divein-object'

    const uploadUrl = S3.getSignedUrl('putObject', {
      Bucket,
      Key: fullPath,
      Expires: 60 * 5,
    })

    const url = `https://divein-object.s3.ap-northeast-2.amazonaws.com/${fullPath}`

    return { uploadUrl, url }
  }
}
