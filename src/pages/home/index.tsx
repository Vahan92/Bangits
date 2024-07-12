import { Container } from '@mui/material';
import TodoForm from './todoForm/todoForm';
import TodoList from './todoList/todoList';
import TodoStats from './todoStats/todoStats';
import { useState } from 'react';
import DeletedTodos from './deletedTodos/deletedTodos';

const Todo: React.FC = () => {
  const [showDeleted, setShowDeleted] = useState(false);
  return (
    <Container
      sx={{
        width: '100%',
        '@media (min-width: 1200px)': {
          maxWidth: '800px'
        },
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
