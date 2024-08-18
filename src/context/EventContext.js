// src/context/EventContext.js
import React, { createContext, useState, useEffect } from 'react';

// Helper functions for local storage
const loadEventsFromLocalStorage = () => {
  const storedEvents = localStorage.getItem('events');
  return storedEvents ? JSON.parse(storedEvents) : [];
};

const saveEventsToLocalStorage = (events) => {
  localStorage.setItem('events', JSON.stringify(events));
};

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [events, setEvents] = useState(loadEventsFromLocalStorage());

  useEffect(() => {
    saveEventsToLocalStorage(events);
  }, [events]);

  const addEvent = (event) => {
    setEvents((prevEvents) => [...prevEvents, event]);
  };

  const editEvent = (updatedEvent) => {
    setEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id ? updatedEvent : event
      )
    );
  };

  const deleteEvent = (id) => {
    setEvents((prevEvents) => prevEvents.filter((event) => event.id !== id));
  };

  return (
    <EventContext.Provider value={{ events, addEvent, editEvent, deleteEvent }}>
      {children}
    </EventContext.Provider>
  );
};

export default EventProvider;
