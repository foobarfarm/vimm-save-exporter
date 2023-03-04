import { inject, injectable } from 'inversify';
import { TYPES } from '../../IOC/types';
import { HTTPClient } from './HTTPClient';

@injectable()
export class SaveRepository {
  @inject(TYPES.HTTPClient) private httpClient: HTTPClient;

  get() {
    return {
      contents: this.httpClient.get().body,
    };
  }
}
