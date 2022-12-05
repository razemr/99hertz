import { Request, Response } from 'express';

import { ReservationService } from '@services/reservation.service';
import { Reservation } from 'interfaces';
import { BadRequestError } from '@utils/apiError';
import { ApiResponse } from '@utils/apiResponse';

export class ReservationController {
  create = async (req: Request, res: Response) => {
    const reservation: Reservation = req.body;
    const existing = await ReservationService.findByVehicleId(
      reservation.vehicleId,
    );

    if (existing) {
      throw new BadRequestError('Vehicle has already been reserved.');
    }

    const from = new Date(reservation.from).getTime();
    const to = new Date(reservation.to).getTime();

    if (from > to) {
      throw new BadRequestError('Invalid date range.');
    }

    const newReservation = await ReservationService.create(reservation);

    res.status(200).json(ApiResponse.success(newReservation));
  };

  read = async (req: Request, res: Response) => {
    const id = req.params.id;
    const reservation = await ReservationService.read(id);

    if (!reservation) {
      throw new BadRequestError('Reservation does not exist.');
    }

    res.status(200).json(ApiResponse.success(reservation));
  };

  update = async (req: Request, res: Response) => {
    const id = req.params.id;
    const reservation = await ReservationService.read(id);

    if (!reservation) {
      throw new BadRequestError('Reservation does not exist.');
    }

    delete req.body.id;
    await ReservationService.update(req.body, id);

    res.status(200).json(ApiResponse.success());
  };

  delete = async (req: Request, res: Response) => {
    const id = req.params.id;
    const reservation = await ReservationService.read(id);

    if (!reservation) {
      throw new BadRequestError('Reservation does not exist.');
    }

    await ReservationService.delete(id);

    res.status(200).json(ApiResponse.success());
  };

  list = async (_req: Request, res: Response) => {
    const reservations = await ReservationService.list();

    res.status(200).json(ApiResponse.success(reservations));
  };
}
