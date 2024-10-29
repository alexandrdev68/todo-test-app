import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { baseURI } from "../../constants/main"
import type { TodoItemType } from "./userTodosSlice"


export const userTodosAPI = createApi({
  reducerPath: "todosAPI",
  tagTypes: ["user"],
  baseQuery: fetchBaseQuery({ baseUrl: baseURI }),
  endpoints: (build) => ({
    getAllTodos: build.query<Array<TodoItemType>, void>({
      query: () => "/todos"
    }),
    getTodos: build.mutation<Array<TodoItemType>, string>({
      query: (user_id: string) => `/users/${user_id}/todos`
    }),
    addTodo: build.mutation<{ status: string }, TodoItemType>({
      query(body) {
        return {
          url: "/todo",
          method: "POST",
          body
        }
      }
    }),
    updateTodo: build.mutation<{ status: string }, TodoItemType>({
      query(body) {
        return {
          url: "/todo",
          method: "PUT",
          body
        }
      }
    }),
    deleteTodo: build.mutation<{ status: string }, string>({
      query(id) {
        return {
          url: `/todo/${id}`,
          method: "DELETE"
        }
      }
    })
  })
})

export const {
  useGetTodosMutation,
  useDeleteTodoMutation,
  useAddTodoMutation,
  useUpdateTodoMutation,
  useGetAllTodosQuery,
} = userTodosAPI
