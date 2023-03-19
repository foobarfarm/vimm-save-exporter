import 'fake-indexeddb/auto';
import { configureFakeSystemTimeForJest } from '../../utils/configureFakeSystemTimeForJest';
import { container } from '../../IOC/container';
import { DatabaseConfig } from '../../utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../../utils/getDexieWithRecordsAdded';
import { IndexedDBSaveRepository } from './IndexedDBSaveRepository';
import { Save } from '../../entities/Save';
import { TYPES } from '../../IOC/types';

const { fakeDate } = configureFakeSystemTimeForJest();

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

describe('IndexedDBSaveRepository', () => {
  beforeAll(async () => {
    await getDexieWithRecordsAdded({
      databaseName: DatabaseConfig.DatabaseName,
      objectStoreName: DatabaseConfig.ObjectStoreName,
      records: [record],
      objectStoreSchema: DatabaseConfig.ObjectStoreSchema,
    });
  });

  describe('getSave', () => {
    it('returns a response object with the expected model', async () => {
      // Arrange
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

  describe('updateSave', () => {
    it('updates the object in the object store as expected', async () => {
      // Arrange
      const indexedDBSaveRepository = container.get<IndexedDBSaveRepository>(
        TYPES.IndexedDBSaveRepository
      );

      const newContents = new Int8Array([1, 2, 3, 4]);

      const expected: SaveRepositoryResult = {
        status: 'success',
        save: new Save({
          contents: newContents,
          mode,
          timestamp: fakeDate,
        }),
      };

      const updates = {
        contents: newContents,
        mode,
        timestamp: fakeDate,
      };

      // Act
      await indexedDBSaveRepository.updateSave(id, updates);

      const actual = await indexedDBSaveRepository.getSaveById(id);

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
