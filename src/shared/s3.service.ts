import { HttpException, Injectable } from '@nestjs/common';
import {
  DeleteObjectCommand,
  PutObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';

@Injectable()
export class S3Service {
  private readonly s3: S3Client;

  constructor() {
    this.s3 = new S3Client({
      endpoint: 'https://nyc3.digitaloceanspaces.com',
      region: 'nyc3',
      forcePathStyle: false,
      credentials: {
        accessKeyId: process.env.SPACES_KEY,
        secretAccessKey: process.env.SPACES_SECRET,
      },
    });
  }

  async uploadFile(
    bucketName: string,
    fileName: string,
    file: Buffer,
    acl: string,
    contentType: string,
    contentDisposition?: string,
  ): Promise<void> {
    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: fileName,
      Body: file,
      ACL: acl,
      ContentType: contentType,
      ContentDisposition: contentDisposition,
    });

    try {
      await this.s3.send(command);
    } catch (error) {
      console.log(error.stack);
      throw new HttpException('Erro ao fazer upload do arquivo', 500);
    }
  }

  async deleteFile(bucketName: string, fileName: string): Promise<void> {
    const command = new DeleteObjectCommand({
      Bucket: bucketName,
      Key: fileName,
    });

    try {
      await this.s3.send(command);
    } catch (error) {
      console.log(error.stack);
      throw new HttpException('Erro ao deletar arquivo', 500);
    }
  }
}
