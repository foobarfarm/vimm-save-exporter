import 'fake-indexeddb/auto';
import { container } from '../../IOC/container';
import { DatabaseConfig } from '../../use-cases/utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../../use-cases/utils/getDexieWithRecordsAdded';
import { IndexedDBSaveRepository } from './IndexedDBSaveRepository';
import { TYPES } from '../../IOC/types';
import { Save } from '../../entities/Save';

const fakeDate = new Date('1981-06-09');
jest.useFakeTimers().setSystemTime(fakeDate);

describe('IndexedDBSaveRepository', () => {
  describe('getSave', () => {
    describe('success', () => {
      it('returns a response object with the expected model', async () => {
        // Arrange
        const id = 'myId';
        const mode = 123;
        const record = {
          key: id,
          item: {
            contents: 'fake-content',
            mode,
            timestamp: fakeDate,
          },
        };

        const configuredDexie = await getDexieWithRecordsAdded({
          databaseName: DatabaseConfig.DatabaseName,
          objectStoreName: DatabaseConfig.ObjectStoreName,
          records: [record],
          objectStoreSchema: DatabaseConfig.ObjectStoreSchema,
        });

        const stubDexieFactory: DexieFactory = () => configuredDexie;

        container
          .rebind<DexieFactory>(TYPES.DexieFactory)
          .toFunction(stubDexieFactory);

        const indexedDBSaveRepository = container.get<IndexedDBSaveRepository>(
          TYPES.IndexedDBSaveRepository
        );

        const expected: SaveRepositoryResult = {
          status: 'success',
          save: new Save(record.item),
        };

        // Act
        const actual = await indexedDBSaveRepository.getSaveById(id);

        // Assert
        expect(actual).toEqual(expected);
      });
    });
  });
});
