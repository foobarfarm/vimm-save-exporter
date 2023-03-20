import { configureFakeSystemTimeForJest } from '../../utils/configureFakeSystemTimeForJest';
import { container } from '../../IOC/container';
import { Save } from '../../entities/Save';
import { VimmSaveSerialiser } from './VimmSaveSerialiser';
import { TYPES } from '../../IOC/types';

const { fakeDate } = configureFakeSystemTimeForJest();

describe('Save Serialiser', () => {
  describe('serialise', () => {
    it('returns a serialised string representation of the Save entity', () => {
      // Arrange
      const save = new Save({
        contents: new Int8Array([1, 2, 3]),
        mode: 123,
        timestamp: fakeDate,
      });

      const saveSerialiser = container.get<VimmSaveSerialiser>(
        TYPES.SaveSerialiser
      );

      // Act
      const serialisedSave = saveSerialiser.serialise(save);

      // Assert
      expect(serialisedSave).toBe(
        `{"contents":[1,2,3],"mode":123,"timestamp":"${fakeDate.toISOString()}"}`
      );
    });
  });

  describe('deserialise', () => {
    it('returns the deserialised Save entity given a serialised Save string', () => {
      // Arrange
      const serialisedSave = `{"contents":[1,2,3],"mode":123,"timestamp":"${fakeDate.toISOString()}"}`;

      const saveSerialiser = container.get<VimmSaveSerialiser>(
        TYPES.SaveSerialiser
      );

      // Act
      const save = saveSerialiser.deserialise(serialisedSave);

      // Assert
      expect(save).toEqual(
        new Save({
          contents: new Int8Array([1, 2, 3]),
          mode: 123,
          timestamp: fakeDate,
        })
      );
    });
  });
});
