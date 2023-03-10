import 'reflect-metadata';
import { Container, interfaces } from 'inversify';
import { dexieFactory } from '../adapters/secondary/dexieFactory';
import { getPrimaryKeyFromGameName } from '../use-cases/utils/getPrimaryKeyFromGameName';
import { IndexedDBSaveRepository } from '../adapters/secondary/IndexedDBSaveRepository';
import { TYPES } from './types';
import Dexie from 'dexie';

const container = new Container();

container
  .bind<IndexedDBSaveRepository>(TYPES.IndexedDBSaveRepository)
  .to(IndexedDBSaveRepository);

container
  .bind<interfaces.Factory<Dexie>>(TYPES.DexieFactory)
  .toFactory<Dexie, [string]>(() => dexieFactory);

container
  .bind<GetPrimaryKeyFromGameName>(TYPES.GetPrimaryKeyFromGameName)
  .toFunction(getPrimaryKeyFromGameName);

export { container };
