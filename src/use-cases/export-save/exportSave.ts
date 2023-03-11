import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { DatabaseConfig } from '../utils/DatabaseConfig';
import { getDexieWithRecordsAdded } from '../utils/getDexieWithRecordsAdded';

export const exportSave = async () => {
  // Look up game in indexedDB
  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );

  const save = await saveRepository.getSaveById('myId');

  console.log(save);

  // Serialise record contents
  // Download serialised contents
};
