import 'fake-indexeddb/auto';
import { configureFakeSystemTimeForJest } from '../../utils/configureFakeSystemTimeForJest';
import { container } from '../../IOC/container';
import { DatabaseConfig } from '../../utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../../utils/getDexieWithRecordsAdded';
import { IndexedDBSaveRepository } from './IndexedDBSaveRepository';
import { Save } from '../../entities/Save';
import { TYPES } from '../../IOC/types';

const { fakeDate } = configureFakeSystemTimeForJest();

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

        // we only care about adding the record, repository will describe schema to new dexie it pulls from container
        await getDexieWithRecordsAdded({
          databaseName: DatabaseConfig.DatabaseName,
          objectStoreName: DatabaseConfig.ObjectStoreName,
          records: [record],
          objectStoreSchema: DatabaseConfig.ObjectStoreSchema,
        });

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
