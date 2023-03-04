import { getPrimaryKeyFromGameName } from './getPrimaryKeyFromGameName';

describe('getPrimaryKeyFromGameName', () => {
  describe('success', () => {
    it('returns the expected primary key for Super Mario RPG', () => {
      // Arrange
      const gameName = 'Super Mario RPG: Legend of the Seven Stars';
      const expected =
        '/data/saves/snes/Super Mario RPG - Legend of the Seven Stars (USA).srm';

      // Act
      const actual = getPrimaryKeyFromGameName(gameName);

      // Assert
      expect(actual).toStrictEqual(expected);
    });
  });
});
