import uploadConfig from '@config/uploads';
import { container } from 'tsyringe';

import DiskStorageProvider from './implementations/DiskStorageProvider';
import MinioStorageProvider from './implementations/MinioStorageProvider';
import { IStorageProvider } from './models/IStorageProvider';

const providers = {
  disk: DiskStorageProvider,
  minio: MinioStorageProvider,
  s3: MinioStorageProvider,
};

container.registerSingleton<IStorageProvider>(
  'StorageProvider',
  providers[uploadConfig.driver],
);
