import type { LandingItem } from "../landing/landingAPI"
import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export type TodoItemType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export interface UserTodosSlice {
  userData: Partial<LandingItem>;
  todos: Array<TodoItemType>;
  selectedTodos: Array<number>;
}

const initialState: UserTodosSlice = {
  userData: {},
  todos: [],
  selectedTodos: []
}

export const userTodosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: create => ({
    storeUserData: create.reducer((state, action: PayloadAction<Partial<LandingItem>>) => {
      state.userData = { ...action.payload }
    }),
    storeTodosList: create.reducer((state, action: PayloadAction<Array<TodoItemType>>) => {
      state.todos = [...action.payload]
    }),
    addTodo: create.reducer((state, action: PayloadAction<TodoItemType>) => {
      state.todos.push(action.payload)
    }),
    deleteTodoItems: create.reducer((state, action: PayloadAction<Array<number>>) => {
      state.todos = state.todos.filter((item) => !action.payload.includes(item.id))
      state.selectedTodos = []
    }),
    updateTodoItem: create.reducer((state, action: PayloadAction<Partial<TodoItemType>>) => {
      state.todos = state.todos.map(
        (item) =>
          item.id === action.payload?.id ? ({ ...item, ...action.payload }) : ({ ...item })
      )
    }),
    updateSelectedTodos: create.reducer((state, action: PayloadAction<TodoItemType>) => {
      state.selectedTodos = !state.selectedTodos.includes(action.payload.id) ? [...state.selectedTodos, action.payload.id]
        : state.selectedTodos.filter((item) => item !== action.payload.id)
    })
  }),
  selectors: {
    selectTodos: (state: UserTodosSlice) => state.todos,
    selectUserData: (state: UserTodosSlice) => state.userData,
    getSelectedTodos: state => state.selectedTodos,
  }
})

export const {getSelectedTodos} = userTodosSlice.selectors
