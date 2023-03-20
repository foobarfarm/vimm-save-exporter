import 'reflect-metadata';
import { Container } from 'inversify';
import { dexieFactory } from '../adapters/secondary/dexieFactory';
import { IndexedDBSaveRepository } from '../adapters/secondary/IndexedDBSaveRepository';
import { TYPES } from './types';
import { downloadFile } from '../adapters/secondary/downloadFile';
import { VimmSaveSerialiser } from '../adapters/secondary/VimmSaveSerialiser';
import { uploadFile } from '../adapters/secondary/uploadFile';

const container = new Container();

container
  .bind<IndexedDBSaveRepository>(TYPES.IndexedDBSaveRepository)
  .to(IndexedDBSaveRepository);

container.bind<DexieFactory>(TYPES.DexieFactory).toFunction(dexieFactory);

container.bind<DownloadFile>(TYPES.DownloadFile).toFunction(downloadFile);

container.bind<UploadFile>(TYPES.UploadFile).toFunction(uploadFile);

container.bind<VimmSaveSerialiser>(TYPES.SaveSerialiser).to(VimmSaveSerialiser);

export { container };
