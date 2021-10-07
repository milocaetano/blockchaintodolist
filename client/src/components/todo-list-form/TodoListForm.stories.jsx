import React from 'react';

import TodoListForm from './TodoListForm';

export default {
  title: 'Components/TodoListForm',
  component: TodoListForm
};

const Template = (args) => {
  function onSubmit(value) {
    console.log('value submitted', value);
  }

  return (
    <TodoListForm
      label={args.label}
      onSubmit={onSubmit}
      placeholder={args.placeholder}
    />
  );
};

export const TodoListFormStory = Template.bind({});
TodoListFormStory.args = {
  label: 'Label', 
  placeholder: 'Placeholder'
};