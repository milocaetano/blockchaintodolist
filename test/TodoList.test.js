const TodoList = artifacts.require('./TodoList.sol');
const truffleAssert = require('truffle-assert');

contract('TodoList', accounts => {
  const FIRST_LIST = 'First List';
  const SECOND_LIST = 'Second List';
  
  let todoList;
  
  before(async () => {
    todoList = await TodoList.deployed();
  });

  describe('createList', () => {
    it('should add the new and empty list for a given user', async () => {
      const tx = await todoList.createList(FIRST_LIST);
      truffleAssert.eventEmitted(tx, 'ListCreated', (event) => {
        const { name } = event;
        return (
          name === FIRST_LIST
        );
      });
    });

    it('should be able to add a second list for a given user', async () => {
      const tx = await todoList.createList(SECOND_LIST);
      truffleAssert.eventEmitted(tx, 'ListCreated', (event) => {
        const { name } = event;
        return (
          name === SECOND_LIST
        );
      })
    });
  });

  describe('getAllListNames', () => {
    it('should return a delimited string containing all of the names', async () => {
      const listNames = await todoList.getAllListNames();
      assert.equal(listNames[0], FIRST_LIST);
      assert.equal(listNames[1], SECOND_LIST);
    });
  });

  // HACK: Test this first to update state of blockchain, so that next test can use that
  describe('updateList', () => {
    it('should be able to update list for the first time', async () => {
      const items = [{ name: 'Apple', checked: false}, { name: 'Banana', checked: false}, { name: 'Grapes', checked: false}];
      const tx = await todoList.updateList(SECOND_LIST, items);
      truffleAssert.eventEmitted(tx, 'ListUpdated', (event) => {
        return (
          event.name === SECOND_LIST
        );
      });
    });

    it('should be able to update list for more than once', async () => {
      const items = [{name: 'Apple', checked: true}, {name: 'Banana', checked: true}, {name: 'Grapes', checked: true}, {name: 'Pears', checked: false}];
      const tx = await todoList.updateList(SECOND_LIST, items);
      truffleAssert.eventEmitted(tx, 'ListUpdated', (event) => {
        return (
          event.name === SECOND_LIST
        );
      });
    });
  });

  describe('getListItems', () => {
    it('should return an array containing all task names and checked status', async () => {
      const items = await todoList.getListItems(SECOND_LIST);
      assert.equal(items[0].name, 'Apple');
      assert.equal(items[0].checked, true);
      assert.equal(items[1].name, 'Banana');
      assert.equal(items[1].checked, true);
      assert.equal(items[2].name, 'Grapes');
      assert.equal(items[2].checked, true);
      assert.equal(items[3].name, 'Pears');
      assert.equal(items[3].checked, false);
    });
  });
});
