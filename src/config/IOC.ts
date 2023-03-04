import { Container } from './Container';

export class IOC {
  container;

  constructor() {
    this.container = new Container();
  }

  configure() {}
}
