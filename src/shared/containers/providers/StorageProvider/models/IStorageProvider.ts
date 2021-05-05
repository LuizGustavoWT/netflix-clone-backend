export interface IStorageProvider {
  saveFile(file: string, bucket?: string): Promise<string>;
  deleteFile(file: string, bucket?: string): Promise<void>;
}
