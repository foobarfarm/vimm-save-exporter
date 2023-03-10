import Dexie from 'dexie';
import { inject, injectable, interfaces } from 'inversify';
import { FactoryType } from 'inversify/lib/utils/factory_type';
import { Save } from '../../entities/Save';
import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { DatabaseConfig } from '../../use-cases/utils/DatabaseConfig';

@injectable()
export class IndexedDBSaveRepository implements SaveRepository {
  async getSave(): Promise<SaveRepositoryResult> {
    const dexieFactory = container.get<interfaces.Factory<Dexie>>(
      TYPES.DexieFactory
    );

    const dexie = dexieFactory(DatabaseConfig.DatabaseName);

    const record = await (dexie as any)[DatabaseConfig.ObjectStoreName].get(
      '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm'
    );

    return {
      status: 'success',
      model: new Save(record),
    };
  }
}
