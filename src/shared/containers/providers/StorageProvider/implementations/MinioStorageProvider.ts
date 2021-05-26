import uploadConfig from '@config/uploads';
import fs from 'fs';
import mime from 'mime';
import { Client } from 'minio';
import path from 'path';

import { IStorageProvider } from '../models/IStorageProvider';

class MinioStorageProvider implements IStorageProvider {
  private client: Client;

  constructor() {
    this.client = new Client({
      endPoint: 'localhost',
      port: 9000,
      useSSL: false,
      accessKey: uploadConfig.config.minio.accessKey,
      secretKey: uploadConfig.config.minio.secretKey,
    });
  }

  public async saveFile(file: string, bucket: string): Promise<string> {
    const originalPath = path.resolve(uploadConfig.tmpFolder, file);

    const ContentType = mime.getType(originalPath);

    if (!ContentType) {
      throw new Error('File Not Found');
    }

    const fileContent = fs.createReadStream(originalPath);

    const fileStat = await fs.promises.stat(originalPath);

    await this.client.putObject(bucket, file, fileContent, fileStat.size, {
      ContentType: 'image',
      Client: 'http://localhost:3333',
    });

    await fs.promises.unlink(originalPath);

    return file;
  }

  public async deleteFile(file: string, bucket: string): Promise<void> {
    await this.client.removeObject(bucket, file);
  }
}

export default MinioStorageProvider;
