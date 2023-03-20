import Dexie from 'dexie';

export const dexieFactory: DexieFactory = (databaseName: string) =>
  new Dexie(databaseName);
