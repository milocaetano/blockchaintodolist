import React, { useEffect, useState } from 'react';
import  { Container, Col, Form, Row, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import TodoListForm from '../../components/todo-list-form/TodoListForm';

import './List.css';

export function List({
  checkItem,
  items,
  onSubmit,
  onSave
}) {
  return (
    <Container className="list" style={{ maxWidth: '1000px' }}>
      <Row>
        <Col>
          <TodoListForm
            label="Add Item"
            onSubmit={onSubmit}
            placeholder="Tomatoes"
          />
        </Col>
      </Row>
      <Row className="items-row-container">
        <Col>
          <div className="section-header">Items</div>
          <Form className="items-container" onSubmit={onSave}>
            {items.map((item, index) => (
              <Form.Check
                className={item.checked ? 'item item-checked' : 'item'}
                type="checkbox"
                onChange={() => checkItem(index, !item.checked)}
                key={index}
                label={item.name}
                checked={item.checked}
              />
            ))}
            <div className="d-grid gap-2">
              <Button variant="primary" type="submit">Save</Button>
            </div>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function ListWrapper({
  account,
  todoList
}) {
  // const listName = useQuery().get('name');
  const [items, setItems] = useState([]);
  const [saving, setSaving] = useState(false);

  /**
   * get items
   */
  useEffect(() => {
    (async function() {
      // setupUpdateListListener();
      setItems(await getItems());
    })();
  }, []);

  function checkItem(index, checked) {
    setItems(previousState => {
      const updatedState = [...previousState];
      updatedState[index].checked = checked;
      return updatedState;
    });
  }

  async function getItems() {
    return new Promise(resolve => {
      resolve([{ name: 'Apple', checked: false }, { name: 'Pears', checked: true }]);
    });
    // return await todoList.methods.getListItems(listName).call();
  }

  async function onSave(event) {
    event.preventDefault();
    setSaving(true);
    setTimeout(() => {
      setSaving(false);
    }, 3000);
    // await todoList.methods.updateList(listName, items).send({ from: account });
  }

  function onSubmit(value) {
    setItems(previousState => ([...previousState, { name: value, checked: false }]));
  }

  /**
   * @description Setting event handler for new post
   */
  // function setupUpdateListListener() {
  //   todoList.events.ListUpdated({}, () => {
  //     setSaving(false);
  //   });
  // }

  return (
    <LoadingOverlay
      active={saving}
      spinner
      text='Saving list state...'
    >
      <List
        checkItem={checkItem}
        items={items}
        onSave={onSave}
        onSubmit={onSubmit}
      />
    </LoadingOverlay>
  );
}