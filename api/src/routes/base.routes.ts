import { Router } from 'express';
import { Validator } from 'express-json-validator-middleware';

export abstract class BaseRoutes {
  protected router: Router = Router();
  protected validator = new Validator({});

  constructor(protected basePath: string) {
  }

  abstract configure(): Router;
}
