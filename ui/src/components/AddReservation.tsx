import React from "react";
import { Button, Form, Stack } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { ThreeDots } from "react-loader-spinner";
import { useMutation, useQueryClient } from "react-query";

import { addReservation } from "../api";
import { Reservation } from "../interfaces";
import { validateDateRange } from "../utils/validateDateRange";

export const AddReservation: React.FC<{}> = () => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({});
  const queryClient = useQueryClient();
  const { mutateAsync, isLoading } = useMutation(addReservation);

  const onSubmit = handleSubmit(async (data) => {
    await mutateAsync(data as Reservation);
    queryClient.invalidateQueries("reservations");
    reset();
  });

  const onCancel = () => {
    reset();
  };

  return (
    <Form noValidate>
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
          isInvalid={(!!errors.to && !!errors.from)}
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
          isInvalid={(!!errors.to && !!errors.from)}
        />
        <Form.Control.Feedback type="invalid">
          Invalid date range
        </Form.Control.Feedback>
      </Form.Group>
      <Stack direction="horizontal" gap={4} className="mt-2">
        {isLoading ? (
          <ThreeDots color="#ccc" height={10} />
        ) : (
          <>
            <Button variant="primary" onClick={onSubmit}>
              Submit
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              Cancel
            </Button>
          </>
        )}
      </Stack>
    </Form>
  );
};
