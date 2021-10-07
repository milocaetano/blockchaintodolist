import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

import './TodoListForm.css';

/**
 * Form used in both the home and list pages
 */
export default function TodoListForm({
  label,
  onSubmit,
  placeholder
}) {
  const formInitialState = { value: '', error: false };
  const [form, setForm] = useState(formInitialState);

  /**
   * Wrapper for preventing default behavior,
   * resetting value, and calling the parent
   * function
   */
  function handleSubmit(event) {
    event.preventDefault();

    const { value } = form;

    if (value.trim() !== '') {
      onSubmit(form.value);
      setForm(formInitialState);
    } else {
      setForm({ value: '', error: true });
    }
  }

  function onChange(event) {
    event.preventDefault();
    const { value } = event.target;
    setForm({ error: value.trim() === '', value });
  }

  return (
    <Form noValidate className="todo-list-form" onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="create-list">
        <Form.Label>{label}</Form.Label>
        <Form.Control
          onChange={onChange}
          value={form.value}
          className={form.error ? 'is-invalid' : ''}
          type="text"
          placeholder={placeholder}
        />
      </Form.Group>
      <div className="d-grid gap-2">
        <Button variant="primary" type="submit">Submit</Button>
      </div>
    </Form>
  );
}