import { Injectable, Logger } from '@nestjs/common';
import { S3 } from 'aws-sdk';
import { v4 as uuid } from 'uuid';
import {
  MulterFieldsRequest,
  MulterFieldsResponse,
  MulterPipeLine,
} from './types/multer.types';
import { Multer } from 'multer';

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
  ): Promise<MulterPipeLine | null> {
    const customFiles = files as unknown as MulterFieldsRequest;
    if (!customFiles.video || !customFiles.thumbNail) {
      return null;
    }
    const pipeline = {} as MulterPipeLine;
    pipeline.thumbNail = [];
    pipeline.video = [];

    const s3 = this.getS3();
    try {
      if (customFiles.thumbNail) {
        for (const file of customFiles.thumbNail) {
          const uploadRes = await s3
            .upload({
              Bucket: 'chang-netflix',
              Body: file.buffer,
              ACL: 'public-read',
              Key: `${uuid()}-${file.originalname}`,
            })
            .promise();

          pipeline.thumbNail.push({
            bucket: uploadRes.Bucket,
            key: uploadRes.Key,
            originalname: file.originalname,
            path: uploadRes.Location,
          });
        }
      }

      if (customFiles.video) {
        for (const file of customFiles.video) {
          const uploadRes = await s3
            .upload({
              Bucket: 'chang-netflix',
              Body: file.buffer,
              ACL: 'public-read',
              Key: `${uuid()}-${file.originalname}`,
            })
            .promise();
          pipeline.video.push({
            bucket: uploadRes.Bucket,
            key: uploadRes.Key,
            originalname: file.originalname,
            path: uploadRes.Location,
          });
        }
      }
      return pipeline;
    } catch (e) {
      console.log(e);
      return null;
    }
  }

  getS3() {
    return new S3();
  }
}
