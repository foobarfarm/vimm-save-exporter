import Dexie from 'dexie';

export const dexieFactory = (databaseName: string) => new Dexie(databaseName);
