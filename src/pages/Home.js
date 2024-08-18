import React, { useState } from "react";
import Kalendar from "../components/Kalendar";
import EventModal from "../components/EventModal";
import EventProvider from "../context/EventContext"; 
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";

const StyledContainer = styled(Container)`
  padding-top: 20px;
`;

const Home = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <EventProvider>
      <StyledContainer>
        <header className="calendar-header">
          <h1>Event Calendar</h1>
          <div className="subtitle">
            Plan your events with ease and elegance
          </div>
        </header>

        <Row className="calendar-main">
          <Col md={12}>
            <Kalendar />
          </Col>
        </Row>
        <EventModal
          show={showModal}
          handleClose={() => setShowModal(false)}
        />
      </StyledContainer>
    </EventProvider>
  );
};

export default Home;
