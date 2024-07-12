import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Link } from '@mui/material';

import { RootState } from '../../../store';

interface TodoStatsProps {
  setShowDeleted: (_showDeleted: boolean) => void;
  showDeleted: boolean;
}

const TodoStats: React.FC<TodoStatsProps> = ({ setShowDeleted, showDeleted }) => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const trashList = useSelector((state: RootState) => state.todo.trashList);

  const totalTodos = todoList.length;
  const totalDeletedTodos = trashList.length;

  const handleShowDeleted = () => {
    setShowDeleted(true);
  };

  const handleShowNotDeleted = () => {
    setShowDeleted(false);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-evenly', margin: '0' }} mt={3} mb={3}>
      <Link
        color={!showDeleted ? '#9819d2' : '#1976d2'}
        component='button'
        variant='body1'
        onClick={handleShowNotDeleted}
      >
        Total Todos: {totalTodos}
      </Link>
      <Link
        color={showDeleted ? '#9819d2' : '#1976d2'}
        component='button'
        variant='body1'
        onClick={handleShowDeleted}
      >
        Total Deleted Todos: {totalDeletedTodos}
      </Link>
    </Box>
  );
};

export default TodoStats;
