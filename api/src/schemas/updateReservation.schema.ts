import { JSONSchema7 } from 'json-schema';

export const updateReservationSchema: JSONSchema7 = {
  type: 'object',
  required: ['vehicleId', 'from', 'to'],
  properties: {
    vehicleId: {
      type: 'string',
    },
    from: {
      type: 'string',
    },
    to: {
      type: 'string',
    },
  },
};
