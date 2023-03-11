interface SaveRepository {
  getSaveById(id: string): Promise<SaveRepositoryResult>;
}

interface SaveRepositoryResult {
  status: 'success' | 'error';
  save?: import('../../entities/Save').Save;
  error?: any;
}

interface IndexedDBClient {
  getOpenRequestByName(databaseName: string): Promise<IDBOpenDBRequest>;
  getObjectStoreByName(objectStore: string): Promise<IDBOpenDBRequest>;
}

type DexieFactory = (databaseName: string) => import('dexie').Dexie;
