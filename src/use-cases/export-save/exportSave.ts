import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';

export const exportSave = () => {
  // Get primary key from game name

  // Look up game in indexedDB
  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );

  const save = saveRepository.getSave();

  console.log(save);

  // Serialise record contents
  // Download serialised contents
};
