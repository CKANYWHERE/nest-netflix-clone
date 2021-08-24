import { Readable } from 'stream';
import { S3 } from 'aws-sdk';

export interface MulterFieldsRequest extends Request {
  video: [
    {
      buffer: Buffer | Uint8Array | Blob | string | Readable;
      location: string | undefined;
      key: string | undefined;
      originalname: string | undefined;
    },
  ];
  thumbNail: [
    {
      buffer: Buffer | Uint8Array | Blob | string | Readable;
      location: string | undefined;
      key: string | undefined;
      originalname: string | undefined;
    },
  ];
}

export interface MulterFieldsResponse {
  video: S3.ManagedUpload.SendData[];
  thumbNail: S3.ManagedUpload.SendData[];
}

export interface MulterPipeLine {
  video: {
    bucket: string | undefined;
    key: string | undefined;
    originalname: string | undefined;
    path: string | undefined;
  }[];

  thumbNail: {
    bucket: string | undefined;
    key: string | undefined;
    originalname: string | undefined;
    path: string | undefined;
  }[];
}
