import React from "react";
import { Container, Navbar as BootstrapNavbar } from "react-bootstrap";

export const Navbar: React.FC<{}> = () => {
  return (
    <BootstrapNavbar bg="dark" variant="dark">
      <Container>
        <BootstrapNavbar.Brand>
          <img
            alt=""
            src="/logo192.png"
            width="30"
            height="30"
            className="d-inline-block align-top"
          />{" "}
          99 Hertz
        </BootstrapNavbar.Brand>
      </Container>
    </BootstrapNavbar>
  );
};
