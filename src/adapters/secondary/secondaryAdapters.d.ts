interface SaveRepository {
  getSaveById(id: string): Promise<SaveRepositoryResult>;
}

interface SaveRepositoryResult {
  status: 'success' | 'error';
  save?: import('../../entities/Save').Save;
  error?: any;
}

type DexieFactory = (databaseName: string) => import('dexie').Dexie;
