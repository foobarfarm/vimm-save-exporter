interface SaveRepository {
  getSave(): Promise<SaveRepositoryResult>;
}

interface SaveRepositoryResult {
  status: 'success' | 'error';
  model?: import('../../entities/Save').Save;
  error?: any;
}

interface IndexedDBClient {
  getOpenRequestByName(databaseName: string): Promise<IDBOpenDBRequest>;
  getObjectStoreByName(objectStore: string): Promise<IDBOpenDBRequest>;
}

type DexieFactory = (databaseName: string) => import('dexie').Dexie;
