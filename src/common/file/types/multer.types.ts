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

// export interface MulterVideoImgType {
//   video: MulterFieldsRequest.video;
//   thumbNail: MulterFieldsRequest[];
// }
