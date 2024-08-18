import React, { useState, useContext } from 'react';
import {
  format,
  eachDayOfInterval,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addMonths,
  subMonths,
  getYear,
  getMonth
} from 'date-fns';
import { EventContext } from '../context/EventContext';
import EventModal from './EventModal';
import { Button, Form } from 'react-bootstrap';
import '../styles/global.css'; // Ensure your styles are imported correctly

const Kalendar = () => {
  const { events, addEvent, editEvent, deleteEvent } = useContext(EventContext);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalEvent, setModalEvent] = useState(null);
  const [expandedEvents, setExpandedEvents] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');

  const start = startOfMonth(currentDate);
  const end = endOfMonth(currentDate);
  const startOfCalendar = startOfWeek(start, { weekStartsOn: 1 });
  const endOfCalendar = endOfWeek(end, { weekStartsOn: 1 });
  const days = eachDayOfInterval({ start: startOfCalendar, end: endOfCalendar });

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value, 10);
    setCurrentDate(new Date(getYear(currentDate), month, 1));
  };

  const handleYearChange = (e) => {
    const year = parseInt(e.target.value, 10);
    setCurrentDate(new Date(year, getMonth(currentDate), 1));
  };

  const isCurrentMonth = (day) => format(day, 'M') === format(currentDate, 'M');
  const isToday = (day) => format(day, 'yyyy-MM-dd') === format(new Date(), 'yyyy-MM-dd');

  const handleDateClick = (day) => {
    setSelectedDate(day);
    setExpandedEvents(false); // Reset expanded events when selecting a new date
  };

  const handleEditEvent = (event) => {
    setModalEvent(event);
    setShowModal(true);
  };

  const handleDeleteEvent = async (id) => {
    try {
      await deleteEvent(id);
    } catch (error) {
      console.error('Error deleting event:', error);
    }
  };

  const handleAddEvent = () => {
    setModalEvent(null);
    setShowModal(true);
  };

  const handleSaveEvent = async (event) => {
    try {
      if (modalEvent) {
        await editEvent(event);
      } else {
        await addEvent(event);
      }
      setShowModal(false);
    } catch (error) {
      console.error('Error saving event:', error);
    }
  };

  const handleDeleteAllEventsForDay = async () => {
    if (selectedDate) {
      const dayString = format(selectedDate, 'yyyy-MM-dd');
      try {
        for (const event of events) {
          const eventDate = new Date(event.date);
          if (isValidDate(eventDate) && format(eventDate, 'yyyy-MM-dd') === dayString) {
            await deleteEvent(event.id);
          }
        }
      } catch (error) {
        console.error('Error deleting events for the day:', error);
      }
    }
  };

  const uniqueTags = ['Work', 'Personal', 'Other', 'Professional'];

  const isValidDate = (date) => date instanceof Date && !isNaN(date.getTime());

  const safeFormatDate = (date, formatString) => {
    try {
      return isValidDate(date) ? format(date, formatString) : '';
    } catch (e) {
      console.error('Date formatting error:', e);
      return '';
    }
  };

  const filteredEvents = events.filter(event => {
    const eventDate = new Date(event.date);
    return isValidDate(eventDate) &&
           isValidDate(selectedDate) &&
           safeFormatDate(eventDate, 'yyyy-MM-dd') === safeFormatDate(selectedDate, 'yyyy-MM-dd') &&
           (categoryFilter ? event.category === categoryFilter : true) &&
           (priorityFilter ? event.importance === priorityFilter : true);
  });

  const getEventCount = (day) => {
    const dayString = safeFormatDate(day, 'yyyy-MM-dd');
    return events.filter(event => {
      const eventDate = new Date(event.date);
      return isValidDate(eventDate) && safeFormatDate(eventDate, 'yyyy-MM-dd') === dayString;
    }).length;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'high-priority';
      case 'medium':
        return 'medium-priority';
      case 'low':
        return 'low-priority';
      default:
        return '';
    }
  };

  const handleToggleDetails = () => {
    setExpandedEvents(prev => !prev);
  };

  return (
    <div className="calendar-page">
      <div className="calendar-main">
        <div className="calendar-section">
          <header className="calendar-controls">
            <div className="controls-left">
              <Button variant="outline-primary" onClick={() => setCurrentDate(subMonths(currentDate, 1))}>
                &larr;
              </Button>
              <Form.Control
                as="select"
                value={getMonth(currentDate)}
                onChange={handleMonthChange}
                className="month-dropdown"
              >
                {[...Array(12).keys()].map(month => (
                  <option key={month} value={month}>{format(new Date(2024, month), 'MMMM')}</option>
                ))}
              </Form.Control>
              <Form.Control
                as="select"
                value={getYear(currentDate)}
                onChange={handleYearChange}
                className="year-dropdown"
              >
                {[...Array(10).keys()].map(year => (
                  <option key={year} value={2020 + year}>{2020 + year}</option>
                ))}
              </Form.Control>
              <Button variant="outline-primary" onClick={() => setCurrentDate(addMonths(currentDate, 1))}>
                &rarr;
              </Button>
            </div>
            <div className="calendar-title">
              <h2>{safeFormatDate(currentDate, 'MMMM yyyy')}</h2>
            </div>
          </header>
          <ul className="weekdays">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map(day => (
              <li key={day} className="weekday">{day}</li>
            ))}
          </ul>
          <ul className="days">
            {days.map(day => (
              <li
                key={safeFormatDate(day, 'yyyy-MM-dd')}
                className={`day ${!isCurrentMonth(day) ? 'inactive' : ''} ${isToday(day) ? 'today' : ''} ${selectedDate && safeFormatDate(day, 'yyyy-MM-dd') === safeFormatDate(selectedDate, 'yyyy-MM-dd') ? 'selected' : ''}`}
                onClick={() => handleDateClick(day)}
              >
                <div className="day-content">
                  <span className="day-number">{safeFormatDate(day, 'd')}</span>
                  <div className="event-count-wrapper">
                    {getEventCount(day) > 0 && (
                      <div className={`event-count ${getPriorityColor('medium')}`}>
                        {getEventCount(day)}
                      </div>
                    )}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
        <div className="events-section">
          {selectedDate && (
            <>
              <div className="events-header">
                <h5>Events on {safeFormatDate(selectedDate, 'MMMM d, yyyy')}</h5>
                <Button className="add-event-button" variant="primary" onClick={handleAddEvent}>
                  Add Event
                </Button>
                <Button className="delete-all-events-button" variant="danger" onClick={handleDeleteAllEventsForDay}>
                  Delete All Events for This Day
                </Button>
              </div>
              <div className="filters">
                <Form.Control
                  as="select"
                  value={categoryFilter}
                  onChange={(e) => setCategoryFilter(e.target.value)}
                  className="category-filter"
                >
                  <option value="">All Categories</option>
                  {uniqueTags.map(tag => (
                    <option key={tag} value={tag}>{tag}</option>
                  ))}
                </Form.Control>
                <Form.Control
                  as="select"
                  value={priorityFilter}
                  onChange={(e) => setPriorityFilter(e.target.value)}
                  className="priority-filter"
                >
                  <option value="">All Priorities</option>
                  <option value="high">High</option>
                  <option value="medium">Medium</option>
                  <option value="low">Low</option>
                </Form.Control>
              </div>
              <Button className="show-more-button" onClick={handleToggleDetails}>
                {expandedEvents ? 'Show Less' : 'Show More'}
              </Button>
              {filteredEvents.length === 0 ? (
                <p>No events scheduled for this day.</p>
              ) : expandedEvents ? (
                <ul className="event-list">
                  {filteredEvents.map(event => (
                    <li key={event.id} className="event-item">
                      <div className="event-info">
                        <h6>{event.title}</h6>
                        <p><strong>Description:</strong> {event.description}</p>
                        <p><strong>Category:</strong> <span className={`event-tag ${event.category}`}>{event.category}</span></p>
                        <p><strong>Created At:</strong> {safeFormatDate(new Date(event.createdAt), 'MMMM d, yyyy HH:mm:ss')}</p>
                        <p><strong>Priority:</strong> <span className={`importance-${event.importance}`}>{event.importance.charAt(0).toUpperCase() + event.importance.slice(1)}</span></p>
                      </div>
                      <div className="event-actions">
                        <Button variant="secondary" onClick={() => handleEditEvent(event)}>Edit</Button>
                        <Button variant="danger" onClick={() => handleDeleteEvent(event.id)}>Delete</Button>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <ul className="event-list brief">
                  {filteredEvents.map(event => (
                    <li key={event.id} className="event-item brief">
                      <div className="event-info">
                        <h6>{event.title}</h6>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </>
          )}
        </div>
      </div>
      {showModal && (
        <EventModal
          show={showModal}
          onClose={() => setShowModal(false)}
          onSave={handleSaveEvent}
          event={modalEvent}
          date={selectedDate} // Pass the selected date to the modal
        />
      )}
    </div>
  );
};

export default Kalendar;
