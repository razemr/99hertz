import { CleanedEnvAccessors, cleanEnv, str, num } from 'envalid';
import { config } from 'dotenv';

config();

export interface IEnvironment {
  NODE_ENV: string;
  PORT: number;
  CLIENT_URL: string;
}

export type TEnvironment = IEnvironment & CleanedEnvAccessors;

export const Environment: TEnvironment = cleanEnv<IEnvironment>(process.env, {
  NODE_ENV: str({ choices: ['development', 'test', 'production', 'staging'] }),
  PORT: num(),
  CLIENT_URL: str(),
});
