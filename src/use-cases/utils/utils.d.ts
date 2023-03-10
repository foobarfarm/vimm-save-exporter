type GetPrimaryKeyFromGameName = (gameName: string) => string;

interface FileDataRecord {
  id: string;
  contents: Int8Array;
}
