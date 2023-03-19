import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';

export const exportSave = async () => {
  const id =
    '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm';

  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );

  const { status, error, save } = await saveRepository.getSaveById(id);

  if (status === 'error') {
    console.error('error fetching save', JSON.stringify(error));

    return;
  }

  const saveSerialiser = container.get<SaveSerialiser>(TYPES.SaveSerialiser);
  const serialisedSave = saveSerialiser.serialise(save);

  const downloadFile = container.get<DownloadFile>(TYPES.DownloadFile);
  downloadFile(`${id}-save.json`, serialisedSave);
};
