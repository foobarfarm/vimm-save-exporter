export class Save {
  contents: Int8Array;

  constructor({ contents }: { id: string; contents: Int8Array }) {
    this.contents = contents;
  }
}
