import React, { useState } from 'react';

import { List } from './List';

export default {
  title: 'Pages/List',
  component: List
};

const Template = (args) => {
  const [items, setItems] = useState(args.itemsOriginal);
  
  function onSubmit(value) {
    setItems(previousState => ([...previousState, { name: value, checked: false }]))
  }

  return (
    <List
      checkItem={(index, checked) => {
        setItems(previousState => {
          const updatedState = [...previousState];
          updatedState[index].checked = checked;
          return updatedState;
        });
      }}
      items={items}
      onSubmit={onSubmit}
    />
  );
};

export const ListStory = Template.bind({});
ListStory.args = {
  itemsOriginal: [
    { name: 'First Item', checked: false },
    { name: 'Second Item', checked: false }
  ]
};