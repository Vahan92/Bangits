import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../types/common';

export interface TodoState {
  todoList: Todo[];
  trashList: Todo[];
}

const initialState: TodoState = {
  todoList: [],
  trashList: []
};

const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{ title: string; description?: string; deadline?: string | null }>
    ) => {
      const newTodo: Todo = {
        id: `${Date.now()}`,
        title: action.payload.title,
        description: action.payload.description,
        deadline: action.payload.deadline,
        status: 'Pending'
      };
      state.todoList.push(newTodo);
    },
    editTodo: (
      state,
      action: PayloadAction<{ id: string; title?: string; description?: string; deadline?: string }>
    ) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload.id);
      if (todo && todo.status !== 'Overdue') {
        if (action.payload.title !== undefined) todo.title = action.payload.title;
        todo.description = action.payload.description;
        todo.deadline = action.payload.deadline;
      }
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.todoList.findIndex((todo) => todo.id === action.payload);
      if (index !== -1) {
        const [removedTodo] = state.todoList.splice(index, 1);
        removedTodo.status = 'Removed';
        state.trashList.push(removedTodo);
      }
    },
    markAsComplete: (state, action: PayloadAction<string>) => {
      const todo = state.todoList.find((todo) => todo.id === action.payload);
      if (todo && todo.status === 'Pending') {
        todo.status = 'Completed';
      }
    },
    updateOverdueStatus: (state) => {
      const currentDate = new Date().toISOString();
      state.todoList.forEach((todo) => {
        if (todo.deadline && todo.deadline < currentDate && todo.status === 'Pending') {
          todo.status = 'Overdue';
        }
      });
    }   
  }
});

export const { addTodo, editTodo, deleteTodo, markAsComplete, updateOverdueStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
