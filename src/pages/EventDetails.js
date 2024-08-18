import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { EventContext } from '../context/EventContext';
import { Container, Card } from 'react-bootstrap';
import styled from 'styled-components';

const DetailsContainer = styled(Container)`
  padding-top: 20px;
`;

const EventDetails = () => {
  const { id } = useParams();
  const { events } = useContext(EventContext);
  const [event, setEvent] = useState(null);

  useEffect(() => {
    const foundEvent = events.find(e => e.id === id);
    setEvent(foundEvent);
  }, [id, events]);

  if (!event) return <div>Loading...</div>;

  return (
    <DetailsContainer>
      <Card>
        <Card.Header as="h5">{event.title}</Card.Header>
        <Card.Body>
          <Card.Text>Date: {event.date}</Card.Text>
          <Card.Text>Importance: {event.importance}</Card.Text>
          <Card.Text>Description: {event.description}</Card.Text>
        </Card.Body>
      </Card>
    </DetailsContainer>
  );
};

export default EventDetails;
