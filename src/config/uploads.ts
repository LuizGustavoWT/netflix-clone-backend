import crypto from 'crypto';
import multer, { StorageEngine } from 'multer';
import path from 'path';

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

interface IUploadConfig {
  driver: 'minio' | 's3' | 'disk';
  tmpFolder: string;
  uploadsFolder: string;
  multer: {
    storage: StorageEngine;
  };
  config: {
    disk: {};
    aws: {
      bucket: string;
    };
    minio: {
      bucket: string;
      accessKey: string;
      secretKey: string;
    };
  };
}

export default {
  driver: process.env.STORAGE_DRIVER,
  tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),
  multer: {
    storage: multer.diskStorage({
      destination: tmpFolder,
      filename: (request, file, callback) => {
        const fileHash = crypto.randomBytes(10).toString('hex');
        const filename = `${fileHash}-${file.originalname}`;

        return callback(null, filename);
      },
    }),
  },

  config: {
    disk: {},
    aws: {
      bucket: process.env.BUCKET_NAME,
    },
    minio: {
      bucket: process.env.BUCKET_NAME,
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    },
  },
} as IUploadConfig;
