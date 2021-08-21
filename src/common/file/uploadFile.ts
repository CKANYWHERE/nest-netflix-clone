import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import { MulterFieldsRequest } from './types/multer.types';

@Injectable()
export class UploadFile {
  async uploadSingle(
    file: Express.Multer.File,
  ): Promise<S3.ManagedUpload.SendData | boolean> {
    const s3 = this.getS3();
    try {
      const uploadRes = await s3
        .upload({
          Bucket: 'chang-netflix',
          Body: file.buffer,
          ACL: 'public-read',
          Key: `${uuid()}-${file.originalname}`,
        })
        .promise();

      return uploadRes;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async uploadArray(
    files: Express.Multer.File[],
  ): Promise<S3.ManagedUpload.SendData[] | boolean> {
    const s3 = this.getS3();
    const resData: S3.ManagedUpload.SendData[] = [];
    try {
      for (const file of files) {
        const uploadRes = await s3
          .upload({
            Bucket: 'chang-netflix',
            Body: file.buffer,
            ACL: 'public-read',
            Key: `${uuid()}-${file.originalname}`,
          })
          .promise();
        resData.push(uploadRes);
      }
      return resData;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  async uploadFields(
    files: Express.Multer.File[],
  ): Promise<S3.ManagedUpload.SendData[] | boolean> {
    const s3 = this.getS3();
    const customFiles = files as unknown as MulterFieldsRequest;
    const resData: S3.ManagedUpload.SendData[] = [];
    try {
      if (customFiles.file1) {
        for (const file of customFiles.file1) {
          const uploadRes = await s3
            .upload({
              Bucket: 'chang-netflix',
              Body: file.buffer,
              ACL: 'public-read',
              Key: `${uuid()}-${file.originalname}`,
            })
            .promise();
          resData.push(uploadRes);
        }
      }

      if (customFiles.file2) {
        for (const file of customFiles.file2) {
          const uploadRes = await s3
            .upload({
              Bucket: 'chang-netflix',
              Body: file.buffer,
              ACL: 'public-read',
              Key: `${uuid()}-${file.originalname}`,
            })
            .promise();
          resData.push(uploadRes);
        }
      }

      if (customFiles.file3) {
        for (const file of customFiles.file3) {
          const uploadRes = await s3
            .upload({
              Bucket: 'chang-netflix',
              Body: file.buffer,
              ACL: 'public-read',
              Key: `${uuid()}-${file.originalname}`,
            })
            .promise();
          resData.push(uploadRes);
        }
      }

      return resData;
    } catch (e) {
      console.log(e);
      return false;
    }
  }

  getS3() {
    return new S3();
  }
}
