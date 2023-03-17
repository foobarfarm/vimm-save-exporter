import 'reflect-metadata';
import { Container } from 'inversify';
import { dexieFactory } from '../adapters/secondary/dexieFactory';
import { getPrimaryKeyFromGameName } from '../use-cases/utils/getPrimaryKeyFromGameName';
import { IndexedDBSaveRepository } from '../adapters/secondary/IndexedDBSaveRepository';
import { TYPES } from './types';
import { downloadFile } from '../adapters/secondary/downloadFile';

const container = new Container();

container
  .bind<IndexedDBSaveRepository>(TYPES.IndexedDBSaveRepository)
  .to(IndexedDBSaveRepository);

container.bind<DexieFactory>(TYPES.DexieFactory).toFunction(dexieFactory);

container
  .bind<GetPrimaryKeyFromGameName>(TYPES.GetPrimaryKeyFromGameName)
  .toFunction(getPrimaryKeyFromGameName);

container.bind<DownloadFile>(TYPES.DownloadFile).toFunction(downloadFile);

export { container };
