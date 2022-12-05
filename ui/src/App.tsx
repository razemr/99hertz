import React from "react";
import { Container, Stack } from "react-bootstrap";

import { AddReservation } from "./components/AddReservation";
import { Header } from "./components/Header";
import { ListReservations } from "./components/ListReservations";
import { Navbar } from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar/>
      <Container>
        <Stack className="mt-4">
          <Header title="New Reservation" />
          <AddReservation />
        </Stack>
        <Stack className="mt-4">
          <Header title="Reservations" />
          <ListReservations />
        </Stack>
      </Container>
    </>
  );
}

export default App;
