import { Reservation } from "./interfaces";

const BASE_URL = process.env.REACT_APP_API_SERVER;

export const getReservations = async () => {
  const response = await fetch(`${BASE_URL}/reservations`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const addReservation = async (reservation: Reservation) => {
  const response = await fetch(`${BASE_URL}/reservations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const getReservation = async ({ queryKey }: { queryKey: any }) => { console.log(queryKey[1])
  const response = await fetch(`${BASE_URL}/reservations/${queryKey[1]}`);

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const updateReservation = async (reservation: Reservation) => {
  const response = await fetch(`${BASE_URL}/reservations/${reservation.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(reservation),
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return response.json();
};

export const removeReservation = async (id: string) => {
  const response = await fetch(`${BASE_URL}/reservations/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await response.text());
  }

  return true;
};
