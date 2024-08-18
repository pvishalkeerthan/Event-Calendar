import React, { useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { Link } from 'react-router-dom';
import { ListGroup, Button } from 'react-bootstrap';

const EventList = () => {
  const { events, deleteEvent } = useContext(EventContext);

  return (
    <ListGroup>
      {events.map(event => (
        <ListGroup.Item key={event.id} className="d-flex justify-content-between align-items-center">
          <Link to={`/event/${event.id}`} className="text-decoration-none">{event.title}</Link>
          <Button variant="danger" onClick={() => deleteEvent(event.id)}>Delete</Button>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default EventList;
