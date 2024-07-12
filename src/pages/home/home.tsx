import { Container } from '@mui/material';
import { useState } from 'react';

import TodoForm from './todoForm/todoForm';
import TodoList from './todoList/todoList';
import TodoStats from './todoStats/todoStats';
import DeletedTodos from './deletedTodos/deletedTodos';

const Todo: React.FC = () => {
  const [showDeleted, setShowDeleted] = useState(false);
  return (
    <Container
      sx={{
        width: '100%',
        maxWidth: '800px !important',
        '& > *': {
          width: '100%'
        }
      }}
    >
      {showDeleted ? <DeletedTodos /> : <TodoList />}
      <TodoStats showDeleted={showDeleted} setShowDeleted={setShowDeleted} />
      <TodoForm />
    </Container>
  );
};

export default Todo;
