import fs from 'fs';
import path from 'path';
import supertest from 'supertest';
import express from 'express';

import { Config } from '../../config';
import { Application } from '../../application';

describe("reservations", () => {
  let fileName = Config.fileName;
  let filePath = path.resolve(__dirname, `../../../data/${fileName}`);
  let app = new Application().server;

  beforeEach(() => {
    fs.writeFileSync(filePath, '[]')
  });

  describe("create reservation endpoint", () => {
    it("should create a new reservation", async () => {
      const { body: { data } } = await supertest(app).post("/reservations").send({
        vehicleId: '123',
        from: new Date('2022-12-10'),
        to: new Date('2022-12-11'),
      });;

      expect(data).toEqual(expect.objectContaining({
        vehicleId: '123'
      }))
    })
  })
});
