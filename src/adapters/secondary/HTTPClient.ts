import { injectable } from 'inversify';

@injectable()
export class HTTPClient {
  get() {
    return { body: 'moo' };
  }
}
