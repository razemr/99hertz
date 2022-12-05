import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import 'express-async-errors';
import { StatusCodes } from 'http-status-codes';

import { Environment } from 'environment';
import { LogService } from '@services/log.service';
import { ApiError } from '@utils/apiError';
import { ApiResponse } from '@utils/apiResponse';
import { ReservationRoutes } from '@routes/reservation.routes';
import { ValidationError } from 'express-json-validator-middleware';

export class Application {
  private server: express.Application;

  constructor() {
    this.server = express();
    this.configureServer();
    this.configureRoutes();
    this.configureErrorHandler();
  }

  private configureServer() {
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use(
      morgan(':method :url :status :res[content-length] - :response-time ms', {
        stream: {
          write: message => LogService.http(message.trim()),
        },
        skip: () => Environment.isProduction,
      }),
    );
  }

  private configureRoutes() {
    this.server.use(new ReservationRoutes('/reservations').configure());
  }

  private configureErrorHandler() {
    this.server.use(
      (
        err: any,
        _req: express.Request,
        res: express.Response,
        _next: express.NextFunction,
      ) => {
        if (err instanceof ApiError) {
          LogService.error(err.message, err.rawErrors);

          return res
            .status(err.statusCode)
            .json(ApiResponse.error(err.message, err.rawErrors));
        }

        if(err instanceof ValidationError) {
          return res
            .status(StatusCodes.BAD_REQUEST)
            .json(ApiResponse.error(err.message, err.validationErrors.body?.map(e => e.message?.toString())));
        }

        LogService.error(err.message);

        res
          .status(StatusCodes.INTERNAL_SERVER_ERROR)
          .json(ApiResponse.error('Internal server error'));
      },
    );
  }

  start() {
    return this.server.listen(Environment.PORT, () => {
      LogService.info(`Server running on port ${Environment.PORT}`);
    });
  }
}
