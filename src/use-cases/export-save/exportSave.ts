import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { DatabaseConfig } from '../utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../utils/getDexieWithRecordsAdded';

export const exportSave = async () => {
  // Look up game in indexedDB
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
