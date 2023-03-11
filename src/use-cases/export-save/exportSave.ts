import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { DatabaseConfig } from '../utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../utils/getDexieWithRecordsAdded';

export const exportSave = async () => {
  // Look up game in indexedDB
  const gameName = 'myId';

  const record = {
    key: gameName,
    item: {
      contents: 'fake-content',
      mode: 123,
      timestamp: new Date(),
    },
  };

  const configuredIndexedDB = await getDexieWithRecordsAdded({
    databaseName: DatabaseConfig.DatabaseName,
    objectStoreName: DatabaseConfig.ObjectStoreName,
    objectStoreSchema: DatabaseConfig.ObjectStoreSchema,
    records: [record],
  });

  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );

  const { status, error, save } = await saveRepository.getSaveById('myId');

  if (status === 'error') {
    console.error('error fetching save', error);

    return;
  }

  console.log(save);

  // Serialise record contents
  // Download serialised contents
};
