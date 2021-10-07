import React, { useState } from 'react';

import { Home } from './Home';

export default {
  title: 'Pages/Home',
  component: Home
};

const Template = (args) => {
  const [lists, setLists] = useState(args.originalList);
  
  function onSave() {
    console.log('saved!');
  }

  function onSubmit(value) {
    setLists(previousState => ([...previousState, value]));
  }

  return (
    <Home
      lists={lists}
      onSave={onSave}
      onSubmit={onSubmit}
    />
  );
};

export const HomeStory = Template.bind({});
HomeStory.args = {
  originalList: [
    'First List',
    'Second List'
  ]
};