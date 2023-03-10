import Dexie from 'dexie';
import 'fake-indexeddb/auto';
import { interfaces } from 'inversify';
import { Save } from '../../entities/Save';
import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { DatabaseConfig } from '../../use-cases/utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../../use-cases/utils/getDexieWithRecordsAdded';
import { IndexedDBSaveRepository } from './IndexedDBSaveRepository';

describe('IndexedDBSaveRepository', () => {
  describe('getSave', () => {
    describe('success', () => {
      it('returns a response object with the expected model', async () => {
        // Arrange
        const configuredDexie = await getDexieWithRecordsAdded({
          databaseName: DatabaseConfig.DatabaseName,
          objectStoreName: DatabaseConfig.ObjectStoreName,
          records: [
            {
              id: '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm',
              contents: new Int8Array([1, 2, 3, 50]),
            },
          ],
          objectStoreSchema: 'id, contents',
        });

        container
          .rebind<interfaces.Factory<Dexie>>(TYPES.DexieFactory)
          .toFactory(() => () => configuredDexie);

        const indexedDBSaveRepository = container.get<IndexedDBSaveRepository>(
          TYPES.IndexedDBSaveRepository
        );

        const expected = {
          status: 'success',
          model: new Save({
            id: '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm',
            contents: new Int8Array([1, 2, 3, 50]),
          }),
        };

        // Act
        const actual = await indexedDBSaveRepository.getSave();

        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
