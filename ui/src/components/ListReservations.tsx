import React, { useState } from "react";
import { Button, Stack, Table } from "react-bootstrap";
import { ThreeDots } from "react-loader-spinner";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { getReservations, removeReservation } from "../api";
import { Reservation } from "../interfaces";
import { EditReservation } from "./EditReservation";

export const ListReservations: React.FC<{}> = () => {
  const [selectedId, setSelectedId] = useState("");
  const { data: result, isLoading } = useQuery("reservations", getReservations);
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(removeReservation);

  if (isLoading) {
    return <ThreeDots color="#ccc" height={40} />;
  }

  const { data: reservations } = result;

  const onClose = () => {
    setSelectedId("");
  };

  const onEdit = (id: string) => {
    setSelectedId(id);
  };

  const onDelete = async (id: string) => {
    await mutateAsync(id);
    queryClient.invalidateQueries("reservations");
  };

  return (
    <>
      <Table>
        <thead>
          <tr>
            <th>Vehicle Id</th>
            <th>From</th>
            <th>To</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation: Reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.vehicleId}</td>
              <td>{reservation.from}</td>
              <td>{reservation.to}</td>
              <td>
                <Stack direction="horizontal" gap={2}>
                  <Button
                    variant="primary"
                    onClick={() => {
                      onEdit(reservation.id!);
                    }}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => {
                      onDelete(reservation.id!);
                    }}
                  >
                    Delete
                  </Button>
                </Stack>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Hack to prevent useForm from caching default value!*/}
      {selectedId != "" && (
        <EditReservation
          id={selectedId}
          show={selectedId != ""}
          onClose={onClose}
        />
      )}
    </>
  );
};
