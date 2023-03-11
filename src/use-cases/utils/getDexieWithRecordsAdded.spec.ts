import 'fake-indexeddb/auto';
import { DatabaseConfig } from './DatabaseConfig';
import { getDexieWithRecordsAdded } from './getDexieWithRecordsAdded';

const fakeDate = new Date('1981-06-09');
jest.useFakeTimers().setSystemTime(fakeDate);

describe('getDexieWithRecordsAdded', () => {
  describe('get', () => {
    it('returns the expected record added to the object store', async () => {
      // Arrange
      const gameName = 'myId';

      const record = {
        gameName,
        contents: 'fake-content',
        mode: 123,
        timestamp: fakeDate,
      };

      const configuredIndexedDB = await getDexieWithRecordsAdded({
        databaseName: DatabaseConfig.DatabaseName,
        objectStoreName: DatabaseConfig.ObjectStoreName,
        objectStoreSchema: '&gameName, contents, mode, timestamp',
        records: [record],
      });

      // Act
      const actual = await configuredIndexedDB[
        DatabaseConfig.ObjectStoreName
      ].get(gameName);

      // Assert
      expect(actual).toEqual(record);
    });
  });
});
