import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';

export const importSave = async () => {
  const id =
    '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm';

  const uploadFile = container.get<UploadFile>(TYPES.UploadFile);
  const serialisedSave = await uploadFile();

  const saveSerialiser = container.get<SaveSerialiser>(TYPES.SaveSerialiser);
  const updates = saveSerialiser.deserialise(serialisedSave);

  const saveRepository = container.get<SaveRepository>(
    TYPES.IndexedDBSaveRepository
  );
  const { status, error } = await saveRepository.updateSave(id, updates);

  if (status === 'error') {
    console.error('error updating save', error);

    return;
  }

  console.log('updated save');
};
