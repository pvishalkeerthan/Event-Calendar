// src/components/EventModal.js
import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { format } from 'date-fns';

const EventModal = ({ show, event, onClose, onSave, date }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [importance, setImportance] = useState('low');

  useEffect(() => {
    if (event) {
      setTitle(event.title || '');
      setDescription(event.description || '');
      setCategory(event.category || '');
      setImportance(event.importance || 'low');
    } else {
      setTitle('');
      setDescription('');
      setCategory('');
      setImportance('low');
    }
  }, [event]);

  const handleSave = (e) => {
    e.preventDefault();
    const newEvent = {
      id: event ? event.id : Date.now(), // Ensure unique ID for new events
      title,
      description,
      category,
      importance,
      date: date ? format(date, 'yyyy-MM-dd') : new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };
    onSave(newEvent);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{event ? 'Edit Event' : 'Add Event'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSave}>
          <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
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
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
          </Form.Group>
          <Form.Group controlId="formCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            >
              <option value="">Select category</option>
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
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Control>
          </Form.Group>
          <div className="modal-actions">
            <Button variant="secondary" onClick={onClose}>Close</Button>
            <Button variant="primary" type="submit">Save</Button>
          </div>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default EventModal;
