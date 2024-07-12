import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Dialog
} from '@mui/material';
import PendingIcon from '@mui/icons-material/HourglassEmpty';
import CompletedIcon from '@mui/icons-material/CheckCircleOutline';
import OverdueIcon from '@mui/icons-material/ErrorOutline';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

import { RootState } from '../../../store';
import { deleteTodo, markAsComplete, updateOverdueStatus  } from '../../../store/todoSlice';
import ConfirmationDialog from '../../../components/confirmationDialog/confirmationDialog';
import TodoForm from '../todoForm/todoForm';
import { Todo } from '../../../types/common';

const TodoList: React.FC = () => {
  const todoList = useSelector((state: RootState) => state.todo.todoList);
  const dispatch = useDispatch();
  const [editData, setEditData] = useState<Todo>({
    id: '',
    title: '',
    description: '',
    deadline: null,
    status: 'Pending'
  });
  const [open, setOpen] = useState(false);
  const [selectedTodoId, setSelectedTodoId] = useState<string | null>(null);
  const [currentDay, setCurrentDay] = useState(new Date().toDateString());

  useEffect(() => {
    const checkDayChange = () => {
      const newDay = new Date().toDateString();
      if (newDay !== currentDay) {
        dispatch(updateOverdueStatus());        
        setCurrentDay(newDay);
      }
    };
    const intervalId = setInterval(checkDayChange, 3000);
    return () => clearInterval(intervalId);
  }, [currentDay]);

  const handleDeleteClick = (id: string) => {
    setSelectedTodoId(id);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTodoId(null);
  };

  const handleConfirmDelete = () => {
    if (selectedTodoId !== null) {
      dispatch(deleteTodo(selectedTodoId));
    }
    handleClose();
  };

  const handleCompleteClick = (id: string) => {
    dispatch(markAsComplete(id));
  };

  const closEdit = () => {
    setEditData({
      id: '',
      title: '',
      description: '',
      deadline: null,
      status: 'Pending'
    });
  };

  const updateTodo = (data: Todo) => {
    setEditData(data);
  };

  const renderIcon = (status: 'Pending' | 'Completed' | 'Overdue' | 'Removed') => {
    switch (status) {
      case 'Pending':
        return <PendingIcon color='primary' />;
      case 'Completed':
        return <CompletedIcon color='success' />;
      case 'Overdue':
        return <OverdueIcon color='error' />;
      default:
        return null;
    }
  };

  return (
    <Box sx={{ marginTop: '0' }} mt={3}>
      <List>
        {todoList.map((todo) => (
          <ListItem sx={{ padding: '8px 0' }} key={todo.id}>
            <ListItemIcon sx={{ minWidth: '36px' }}>{renderIcon(todo.status)}</ListItemIcon>
            <ListItemText
              secondaryTypographyProps={{ display: 'flex', gap: '6px', flexDirection: 'column' }}
              primary={
                <Box
                  sx={{
                    display: 'flex',
                    gap: '12px',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <Typography sx={{ color: 'black', fontWeight: '600' }}>{todo.title}</Typography>
                  <Box sx={{ display: 'flex', gap: '12px', height: '40px' }}>
                    {todo.status === 'Pending' && (
                      <>
                        <Tooltip title='Mark as Complete'>
                          <IconButton
                            edge='end'
                            aria-label='complete'
                            onClick={() => handleCompleteClick(todo.id)}
                          >
                            <CheckCircleIcon sx={{ color: 'green' }} />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title='Edit todo'>
                          <IconButton onClick={() => updateTodo(todo)} edge='end' aria-label='edit'>
                            <EditIcon sx={{ color: 'yellow' }} />
                          </IconButton>
                        </Tooltip>
                      </>
                    )}
                    <Tooltip title='Delete todo'>
                      <IconButton
                        edge='end'
                        aria-label='delete'
                        onClick={() => handleDeleteClick(todo.id)}
                      >
                        <DeleteIcon sx={{ color: 'red' }} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </Box>
              }
              secondary={
                <>
                  {todo.description && (
                    <Typography component='span' sx={{ margin: '7px 0' }}>
                      {todo.description}
                    </Typography>
                  )}
                  {todo.deadline && (
                    <Typography component='span'>
                      Deadline: {new Date(todo.deadline).toLocaleDateString()}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
      <ConfirmationDialog
        open={open}
        title='Confirm Delete'
        text='Are you sure you want to delete this todo?'
        onConfirm={handleConfirmDelete}
        onCancel={handleClose}
      />
      <Dialog onClose={closEdit} open={Boolean(editData.id)}>
        <TodoForm onCancel={closEdit} editMode={Boolean(editData.id)} {...editData} />
      </Dialog>
    </Box>
  );
};

export default TodoList;
