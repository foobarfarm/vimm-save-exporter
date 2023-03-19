import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';

export const importSave = async () => {
  const id = 'myId';

  const uploadFile = container.get<UploadFile>(TYPES.UploadFile);
  const serialisedSave = await uploadFile();

  const saveSerialiser = container.get<SaveSerialiser>(TYPES.SaveSerialiser);
  const save = saveSerialiser.deserialise(serialisedSave);

  console.log(save);
};
