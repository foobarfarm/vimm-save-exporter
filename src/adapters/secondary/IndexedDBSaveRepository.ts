import { DatabaseConfig } from '../../use-cases/utils/DatabaseConfig';
import { inject, injectable } from 'inversify';
import { TYPES } from '../../IOC/types';
import Dexie from 'dexie';
import { Save } from '../../entities/Save';

@injectable()
export class IndexedDBSaveRepository implements SaveRepository {
  private dexie: Dexie;

  constructor(@inject(TYPES.DexieFactory) dexieFactory: DexieFactory) {
    this.dexie = dexieFactory(DatabaseConfig.DatabaseName);
  }

  async getSaveById(id: string): Promise<SaveRepositoryResult> {
    try {
      // describe to dexie the schema for the object store
      this.dexie.version(1).stores({
        [DatabaseConfig.ObjectStoreName]: DatabaseConfig.ObjectStoreSchema,
      });

      const record = await (this.dexie as any)[
        DatabaseConfig.ObjectStoreName
      ].get(id);

      return {
        status: 'success',
        save: new Save(record),
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    }
  }
}
