import React from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button, Box, Container } from '@mui/material';

import { addTodo, editTodo } from '../../../store/todoSlice';
import FormDatePicker from '../../../components/formElements/datePicker/datePicker';
import TextArea from '../../../components/formElements/textArea/textArea';
import Input from '../../../components/formElements/input/input';

interface TodoFormInput {
  title: string;
  description?: string;
  deadline?: Date | null;
}

interface TodoFormProps {
  editMode?: boolean;
  onCancel?: () => void;
  id?: string;
  title?: string;
  description?: string;
  deadline?: string | null;
  status?: 'Pending' | 'Completed' | 'Overdue' | 'Removed';
}

const today = new Date();
today.setHours(0, 0, 0, 0);

const schema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required('Title is required')
    .min(1, 'Title cannot be empty')
    .max(70, 'No more than 70 characters'),
  description: yup.string().trim().max(250, 'No more than 250 characters'),
  deadline: yup.date().nullable().min(today, 'Deadline cannot be in the past')
});

const TodoForm: React.FC<TodoFormProps> = ({
  id,
  editMode = false,
  title,
  description,
  deadline,
  onCancel
}) => {
  const dispatch = useDispatch();
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: title ?? '',
      description: description ?? '',
      deadline: deadline ? new Date(deadline) : null
    }
  });

  const onSubmit: SubmitHandler<TodoFormInput> = (data) => {
    if (editMode && id !== undefined) {
      dispatch(
        editTodo({
          id,
          title: data.title,
          description: data.description,
          deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined
        })
      );
      onCancel && onCancel();
    } else {
      dispatch(
        addTodo({
          title: data.title,
          description: data.description,
          deadline: data.deadline ? new Date(data.deadline).toISOString() : undefined
        })
      );
    }
    methods.reset();
  };

  return (
    <Container sx={{ marginBottom: '24px' }}>
      <FormProvider {...methods}>
        <Box
          component='form'
          sx={{ marginTop: '0', mt: 3 }}
          onSubmit={methods.handleSubmit(onSubmit)}
        >
          <Input name='title' label='Title' />
          <FormDatePicker name='deadline' label='Deadline' />
          <TextArea name='description' label='Description' />
          <Box sx={{ display: 'flex', gap: 2 }}>
            <Button type='submit' variant='contained' color='primary' fullWidth>
              {editMode ? 'Update Task' : 'Add Task'}
            </Button>
            {editMode && onCancel && (
              <Button
                type='button'
                variant='contained'
                color='secondary'
                fullWidth
                onClick={onCancel}
              >
                Cancel
              </Button>
            )}
          </Box>
        </Box>
      </FormProvider>
    </Container>
  );
};

export default TodoForm;
