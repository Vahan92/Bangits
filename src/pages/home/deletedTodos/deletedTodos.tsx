import React from 'react';
import { useSelector } from 'react-redux';
import {
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
} from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

import { RootState } from '../../../store';

const DeletedTodos: React.FC = () => {
  const deletedTodos = useSelector((state: RootState) => state.todo.trashList);

  return (
    <Box sx={{ marginTop: '0' }} mt={3}>
      <List>
        {deletedTodos.map((todo) => (
          <ListItem key={todo.id}>
            <ListItemIcon>
              <ErrorOutlineIcon color='error' />
            </ListItemIcon>
            <ListItemText
              primary={
                <Typography component='div' sx={{ color: 'black', fontWeight: '600' }}>
                  {todo.title}
                </Typography>
              }
              secondary={
                <>
                  {todo.description && (
                    <Typography component='div' sx={{ margin: '7px 0' }}>
                      {todo.description}
                    </Typography>
                  )}
                  {todo.deadline && (
                    <Typography component='div'>
                      Deadline: {new Date(todo.deadline).toLocaleDateString()}
                    </Typography>
                  )}
                </>
              }
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default DeletedTodos;
