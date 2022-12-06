import fs from 'fs';
import path from 'path';
import { randomUUID } from 'crypto';

import { Reservation } from 'interfaces';
import { Config } from '../config';

const filePath = path.resolve(__dirname, `../../data/${Config.fileName}`);

export class ReservationService {
  static async list(): Promise<Reservation[]> {
    return getReservations();
  }

  static async create(reservation: Reservation): Promise<Reservation> {
    const reservations = await getReservations();
    const newReservation = { ...reservation, id: randomUUID() };
    await saveReservations([...reservations, newReservation]);

    return newReservation;
  }

  static async update(reservation: Reservation, id: string): Promise<void> {
    const reservations = await getReservations();
    await saveReservations(
      reservations.map(r => {
        return r.id === id ? { ...r, ...reservation } : r;
      }),
    );
  }

  static async delete(id: string): Promise<void> {
    const reservations = await getReservations();
    await saveReservations(
      reservations.filter(r => {
        return r.id !== id;
      }),
    );
  }

  static async read(id: string): Promise<Reservation | undefined> {
    const reservations = await getReservations();
    return reservations.find(r => r.id === id);
  }

  static async findByVehicleId(id: string): Promise<Reservation | undefined> {
    const reservations = await getReservations();
    return reservations.find(r => r.vehicleId === id);
  }
}

const getReservations = async (): Promise<Reservation[]> => {
  let data = await fs.promises.readFile(filePath, 'utf8');
  const reservations = JSON.parse(data);
  return reservations as Reservation[];
};

const saveReservations = async (reservations: Reservation[]): Promise<void> => {
  const data = JSON.stringify(reservations);
  await fs.promises.writeFile(filePath, data, {
    encoding: 'utf8',
    flag: 'w',
  });
};
