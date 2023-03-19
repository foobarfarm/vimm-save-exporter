import 'fake-indexeddb/auto';
import { configureFakeSystemTimeForJest } from './configureFakeSystemTimeForJest';
import { DatabaseConfig } from './DatabaseConfig';
import { getDexieWithRecordsAdded } from './getDexieWithRecordsAdded';

const { fakeDate } = configureFakeSystemTimeForJest();

describe('getDexieWithRecordsAdded', () => {
  describe('get', () => {
    it('returns the expected record added to the object store', async () => {
      // Arrange
      const gameName = 'myId';

      const record = {
        key: gameName,
        item: {
          contents: 'fake-content',
          mode: 123,
          timestamp: fakeDate,
        },
      };

      const configuredIndexedDB = await getDexieWithRecordsAdded({
        databaseName: DatabaseConfig.DatabaseName,
        objectStoreName: DatabaseConfig.ObjectStoreName,
        objectStoreSchema: DatabaseConfig.ObjectStoreSchema,
        records: [record],
      });

      // Act
      const actual = await configuredIndexedDB[
        DatabaseConfig.ObjectStoreName
      ].get(gameName);

      configuredIndexedDB.close();

      // Assert
      expect(actual).toEqual(record.item);
    });
  });
});
