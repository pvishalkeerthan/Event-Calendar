import React, { useState, useContext } from 'react';
import { EventContext } from '../context/EventContext';
import { Modal, Button, Form } from 'react-bootstrap';
import './EventForm.css'; // Import custom styles for the form

const EventForm = ({ handleClose, eventToEdit, selectedDate }) => {
  const { addEvent, editEvent } = useContext(EventContext);
  const [title, setTitle] = useState(eventToEdit ? eventToEdit.title : '');
  const [description, setDescription] = useState(eventToEdit ? eventToEdit.description : '');
  const [category, setCategory] = useState(eventToEdit ? eventToEdit.category : 'Personal');
  const [importance, setImportance] = useState(eventToEdit ? eventToEdit.importance : 'Low');

  const handleSubmit = () => {
    const event = {
      title,
      description,
      category,
      importance,
      date: selectedDate || new Date().toISOString().split('T')[0], // Use current date if none is selected
    };
    if (eventToEdit) {
      editEvent({ ...event, id: eventToEdit.id });
    } else {
      addEvent(event);
    }
    handleClose();
  };

  return (
    <Modal show={true} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{eventToEdit ? 'Edit Event' : 'Add Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter event title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Enter event description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="Personal">Personal</option>
              <option value="Work">Work</option>
              <option value="Professional">Professional</option>
              <option value="Other">Other</option>
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="formImportance">
            <Form.Label>Importance</Form.Label>
            <Form.Control
              as="select"
              value={importance}
              onChange={(e) => setImportance(e.target.value)}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EventForm;
