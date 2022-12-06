import fs from 'fs';
import path from 'path';

import { ReservationService } from '../../services/reservation.service';
import { Config } from '../../config';

describe('reservations', () => {
  let fileName = Config.fileName;
  let filePath = path.resolve(__dirname, `../../../data/${fileName}`);

  beforeEach(() => {
    fs.writeFileSync(filePath, '[]')
  });

  it('should create a reservation', async () => {
    await ReservationService.create({
      vehicleId: '123',
      from: new Date('2022-12-10'),
      to: new Date('2022-12-11'),
    });

    let data = fs.readFileSync(filePath, 'utf8');
    const reservations = JSON.parse(data);

    expect(reservations).toEqual(expect.arrayContaining(
      [expect.objectContaining({
        vehicleId: '123'
      })]
    ))
  });
});
