import { Environment } from './environment';

export interface IConfig {
  fileName: string;
}

export const Config: IConfig = {
  fileName: Environment.isTest ? 'test-reservations.json' : 'reservations.json',
};
