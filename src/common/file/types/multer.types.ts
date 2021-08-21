import { Readable } from 'stream';

export interface MulterFieldsRequest extends Request {
  file1: [
    {
      buffer: Buffer | Uint8Array | Blob | string | Readable;
      location: string | undefined;
      key: string | undefined;
      originalname: string | undefined;
    },
  ];
  file2: [
    {
      buffer: Buffer | Uint8Array | Blob | string | Readable;
      location: string | undefined;
      key: string | undefined;
      originalname: string | undefined;
    },
  ];
  file3: [
    {
      buffer: Buffer | Uint8Array | Blob | string | Readable;
      location: string | undefined;
      key: string | undefined;
      originalname: string | undefined;
    },
  ];
}
