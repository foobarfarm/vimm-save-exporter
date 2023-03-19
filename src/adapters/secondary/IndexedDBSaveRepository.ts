import { DatabaseConfig } from '../../utils/DatabaseConfig';
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
      await this.dexie.open();

      const objectStore = this.dexie.table(DatabaseConfig.ObjectStoreName);

      const record = await objectStore.get(id);

      return {
        status: 'success',
        save: new Save(record),
      };
    } catch (error) {
      return {
        status: 'error',
        error,
      };
    } finally {
      this.dexie.close();
    }
  }
}
