import React, { useEffect } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { useMutation, useQuery, useQueryClient } from "react-query";

import { getReservation, updateReservation } from "../api";
import { Reservation } from "../interfaces";
import { validateDateRange } from "../utils/validateDateRange";

export const EditReservation: React.FC<{
  id: string;
  show: boolean;
  onClose: () => void;
}> = ({ id, show, onClose }) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();
  const { data: result, isLoading } = useQuery(
    ["reservation", id],
    getReservation
  );

  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(updateReservation);

  useEffect(() => {
    reset(result?.data);
  }, [result]);

  if (isLoading) {
    return <ThreeDots color="#ccc" height={40} />;
  }

  const onHide = () => {
    reset();
    onClose();
  };

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync({...data, id} as Reservation);
    queryClient.invalidateQueries("reservations");
    onClose();
  });

  return (
    <Modal show={show} onHide={onHide}>
      <Form noValidate>
        <Modal.Header closeButton>
          <Modal.Title>Edit Reservation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Vehicle Id</Form.Label>
            <Form.Control
              type="text"
              {...register("vehicleId", { required: true })}
              isInvalid={!!errors.vehicleId}
            />
            <Form.Control.Feedback type="invalid">
              Vehicle Id is required.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>From</Form.Label>
            <Form.Control
              type="date"
              {...register("from", {
                required: true,
                validate: (from) => {
                  const to = getValues("to");
                  return validateDateRange(from, to);
                },
              })}
              isInvalid={!!errors.to && !!errors.from}
            />
            <Form.Control.Feedback type="invalid">
              Invalid date range
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group>
            <Form.Label>To</Form.Label>
            <Form.Control
              type="date"
              {...register("to", {
                required: true,
                validate: (to) => {
                  const from = getValues("from");
                  return validateDateRange(from, to);
                },
              })}
              isInvalid={!!errors.to && !!errors.from}
            />
            <Form.Control.Feedback type="invalid">
              Invalid date range
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              onClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={onSubmit}>Submit</Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};
