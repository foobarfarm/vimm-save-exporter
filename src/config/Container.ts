export class Container {
  entries: Record<string, any> = {};

  add(name: string, entry: any) {
    this.entries[name] = entry;
  }

  get(name: string) {
    return this.entries[name];
  }
}
