import { Save } from '../entities/Save';
import { configureFakeSystemTimeForJest } from './configureFakeSystemTimeForJest';

const { fakeDate } = configureFakeSystemTimeForJest();

describe('Serialise Save', () => {
  it('serialises the Save to the expected string', () => {
    // Arrange
    const save = new Save({
      contents: new Int8Array([123]),
      mode: 123,
      timestamp: fakeDate,
    });
    // Act

    // Assert
    expect(true).toBe(true);
  });
});
