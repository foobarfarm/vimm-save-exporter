import { DatabaseConfig } from '../../use-cases/utils/DatabaseConfig';
import { inject, injectable } from 'inversify';
import { Save } from '../../entities/Save';
import { TYPES } from '../../IOC/types';
import Dexie from 'dexie';

@injectable()
export class IndexedDBSaveRepository implements SaveRepository {
  private dexie: Dexie;

  constructor(@inject(TYPES.DexieFactory) dexieFactory: DexieFactory) {
    this.dexie = dexieFactory(DatabaseConfig.DatabaseName);
  }

  async getSave(): Promise<SaveRepositoryResult> {
    const record = await (this.dexie as any)[
      DatabaseConfig.ObjectStoreName
    ].get(
      '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm'
    );

    return {
      status: 'success',
      model: new Save(record),
    };
  }
}
