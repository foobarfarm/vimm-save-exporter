import 'fake-indexeddb/auto';
import { DatabaseConfig } from './DatabaseConfig';
import { getDexieWithRecordsAdded } from './getDexieWithRecordsAdded';
import { getPrimaryKeyFromGameName } from './getPrimaryKeyFromGameName';

describe('getDexieWithRecordsAdded', () => {
  describe('get', () => {
    it('returns the expected record added to the object store', async () => {
      // Arrange
      const primaryKey = 'myId';

      const record = { id: primaryKey, contents: 'fake-content' };

      const configuredIndexedDB = await getDexieWithRecordsAdded({
        databaseName: DatabaseConfig.DatabaseName,
        objectStoreName: DatabaseConfig.ObjectStoreName,
        objectStoreSchema: 'id, contents',
        records: [record],
      });

      // Act
      const actual = await configuredIndexedDB[
        DatabaseConfig.ObjectStoreName
      ].get(primaryKey);

      // Assert
      expect(actual).toEqual(record);
    });
  });
});
