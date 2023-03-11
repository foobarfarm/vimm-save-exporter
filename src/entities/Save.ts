export class Save {
  contents: Int8Array;
  mode: number;
  timestamp: Date;

  constructor({ contents, mode, timestamp }: any) {
    this.contents = contents;
    this.mode = mode;
    this.timestamp = timestamp;
  }
}
