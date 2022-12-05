import { Router } from 'express';

import { BaseRoutes } from './base.routes';
import { ReservationController } from '@controllers/reservation.controller';
import { createReservationSchema } from 'schemas/createReservation.schema';
import { updateReservationSchema } from 'schemas/updateReservation.schema';

export class ReservationRoutes extends BaseRoutes {
  private controller: ReservationController;

  constructor(basePath: string) {
    super(basePath);
    this.controller = new ReservationController();
  }

  configure(): Router {
    this.router
      .route(`${this.basePath}`)
      .get(this.controller.list)
      .post(this.validator.validate({ body: createReservationSchema}), this.controller.create);

    this.router
      .route(`${this.basePath}/:id`)
      .get(this.controller.read)
      .put(this.validator.validate({ body: updateReservationSchema}), this.controller.update)
      .delete(this.controller.delete);

    return this.router;
  }
}
