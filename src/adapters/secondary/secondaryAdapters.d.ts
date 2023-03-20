interface SaveRepository {
  getSaveById(id: string): Promise<SaveRepositoryResult>;
  updateSave(id: string, updates: any): Promise<SaveRepositoryResult>;
}

interface SaveRepositoryResult {
  status: 'success' | 'error';
  save?: import('../../entities/Save').Save;
  error?: any;
}

type DexieFactory = (databaseName: string) => import('dexie').Dexie;

type DownloadFile = (name: string, contents: string) => Promise<void>;

type UploadFile = () => Promise<string>;

interface SaveSerialiser {
  serialise: (save: import('../../entities/Save').Save) => string;
  deserialise: (serialisedSave: string) => import('../../entities/Save').Save;
}
