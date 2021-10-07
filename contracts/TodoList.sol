// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;


contract TodoList {
  string[] lists;
  mapping( string=> Item[]) listItemsMap;
  struct Item{
    string name;
    bool checked;
  }

  event ListCreated(string name);
  event ListUpdated(string name);
  function createList(string memory listName) public {

    lists.push(listName);
    emit ListCreated(listName);
  }

  function getAllListNames() public view returns (string[] memory) {
    return lists;
  }

  function getListItems(string memory listName) public view returns (Item[] memory) {
     Item[] memory currentItems = listItemsMap[listName];
    
    return currentItems;
  }

  function updateList(string memory listName, Item[] memory items) public {
      Item[] storage currentItems = listItemsMap[listName];
      Item memory item;

      for(uint i=0; i<items.length; i++){
          item.name = items[i].name;
          item.checked=items[i].checked;
          if(currentItems.length > 0 && i <= currentItems.length-1){
              currentItems[i].name = item.name;
              currentItems[i].checked = item.checked;
          }else{
            currentItems.push(item);
          }
      }

      emit ListUpdated(listName);
  }
}