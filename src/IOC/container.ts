import { Container } from 'inversify';
import 'reflect-metadata';
import { HTTPClient } from '../adapters/secondary/HTTPClient';
import { SaveRepository } from '../adapters/secondary/SaveRepository';
import { TYPES } from './types';

const container = new Container();

container.bind<SaveRepository>(TYPES.SaveRepository).to(SaveRepository);
container.bind<HTTPClient>(TYPES.HTTPClient).to(HTTPClient);

export { container };
