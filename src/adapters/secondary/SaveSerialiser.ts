import { injectable } from 'inversify';
import { Save } from '../../entities/Save';

@injectable()
export class SaveSerialiser {
  serialise(save: Save): string {
    const serialisableSaveObject = {
      ...save,
      contents: Array.from(save.contents),
    };

    return JSON.stringify(serialisableSaveObject);
  }

  deserialise(serialisedSave: string): Save {
    const { contents, mode, timestamp } = JSON.parse(serialisedSave) as {
      contents: number[];
      mode: number;
      timestamp: string;
    };

    return new Save({
      contents: Int8Array.from(contents),
      mode,
      timestamp: new Date(timestamp),
    });
  }
}
