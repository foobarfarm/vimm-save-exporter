import { container } from '../../IOC/container';
import { TYPES } from '../../IOC/types';
import { HTTPClient } from './HTTPClient';
import { SaveRepository } from './SaveRepository';

describe('SaveRepository', () => {
  describe('get', () => {
    it('returns the expected object', () => {
      // Arrange
      const expected = {
        contents: 'fake',
      };

      const HTTPClientStub: HTTPClient = {
        get: () => ({ body: 'fake' }),
      };

      container
        .rebind<HTTPClient>(TYPES.HTTPClient)
        .toConstantValue(HTTPClientStub);

      const saveRepository = container.get<SaveRepository>(
        TYPES.SaveRepository
      );
      // Act
      const actual = saveRepository.get();

      // Assert
      expect(actual).toEqual(expected);
    });
  });
});
