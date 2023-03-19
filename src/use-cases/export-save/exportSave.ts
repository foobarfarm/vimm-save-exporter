import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';

export const exportSave = async () => {
  const id = 'myId';

  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );

  const { status, error, save } = await saveRepository.getSaveById(id);

  if (status === 'error') {
    console.error('error fetching save', error);

    return;
  }

  const saveSerialiser = container.get<SaveSerialiser>(TYPES.SaveSerialiser);
  const serialisedSave = saveSerialiser.serialise(save);

  const downloadSave = container.get<DownloadFile>(TYPES.DownloadFile);
  downloadSave(`${id}-save.json`, serialisedSave);
};
