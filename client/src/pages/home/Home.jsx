import React, { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col
} from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import LoadingOverlay from 'react-loading-overlay';
import TodoListForm from '../../components/todo-list-form/TodoListForm';

import './Home.css';

export function Home({ lists, onSubmit }) {
  return (
    <Container className="home" style={{ maxWidth: '1000px' }}>
      <Row>
        <Col>
          <TodoListForm
            label="Create List"
            onSubmit={onSubmit}
            placeholder="Today's Shopping List"
          />
        </Col>
      </Row>
      <Row className="lists-container">
        <div className="section-header lists-header">Lists</div>
        <div className="lists">{lists.map((list, index) => (<List key={index} name={list}/>))}</div>
      </Row>
    </Container>
  );
}

function List({
  name
}) {
  const history = useHistory();

  return (
    <div className="list-item" onClick={() => history.push(`/list?name="${name}"`)}>{name}</div>
  );
}

export function HomeWrapper({
  account,
  todoList
}) {
  const [lists, setLists] = useState([]);
  const [submittingNewList, setSubmittingNewList] = useState(false);

  /**
   * get lists
   */
  useEffect(() => {
    (async function() {
      // setupCreateListListener();
      setLists(await getLists());
    })();
  }, []);

  async function getLists() {
    return new Promise(resolve => {
      resolve(['First List', 'Second List']);
    });
    // return await todoList.methods.getAllListNames().call();
  }

  async function onSubmit(value) {
    setSubmittingNewList(true);
    setTimeout(() => {
      setLists(previousState => ([...previousState, value]));
      setSubmittingNewList(false);
    }, 5000);
    // add new post to blockchain
    // await todoList.methods.createList(value).send({ from: account });
  }

  /**
   * @description Setting event handler for new post
   */
  // function setupCreateListListener() {
  //   todoList.events.ListCreated({}, (error, contractEvent) => {
  //     console.log('contractEvent.returnValues.name', contractEvent.returnValues.name);
  //     setLists(previousState => [...previousState, contractEvent.returnValues.name])
  //     setSubmittingNewList(false);
  //   });
  // }

  return (
    <LoadingOverlay
      active={submittingNewList}
      spinner
      text='Creating new list...'
    >
      <Home
        lists={lists}
        onSubmit={onSubmit}
      />
    </LoadingOverlay>
  );
}