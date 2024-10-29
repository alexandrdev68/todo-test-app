import type { PropsWithChildren } from "react"
import { useCallback } from "react"
import classes from "./LeftMenu.module.css"
import { getSelectedTodos, userTodosSlice } from "../userTodosSlice"
import { useAppDispatch, useAppSelector } from "../../../app/hooks"
import { useAddTodoMutation, useDeleteTodoMutation } from "../userTodosAPI"

type LeftMenuComponentType = PropsWithChildren<{
  user_id: string
}>

export function LeftMenu({ user_id }: LeftMenuComponentType) {
  const { addTodo, deleteTodoItems } = userTodosSlice.actions
  const dispatch = useAppDispatch()
  const selectedTodos = useAppSelector(getSelectedTodos)
  const [deleteTodo] = useDeleteTodoMutation()
  const [addTodoService] = useAddTodoMutation()

  const onAddTodo = useCallback(() => {
    const newTodo = { id: new Date().getTime(), title: "", completed: false, userId: Number(user_id) }
    addTodoService(newTodo).then((response) => {
      // ignore response error
      dispatch(addTodo(newTodo))
    })

  }, [addTodo, addTodoService, dispatch, user_id])

  const onDeleteTodo = useCallback(() => {
    Promise.all(selectedTodos.map((id) => deleteTodo(String(id))))
      .then((results) => {
        results.forEach((result) => {
          // ignore result because these requests are not existing
          dispatch(deleteTodoItems(selectedTodos))
        })
      })
  }, [deleteTodo, deleteTodoItems, dispatch, selectedTodos])

  return (
    <>
      <ul className={`${classes["left-menu-container"]} list-group list-group-flush`}>
        <li className={"list-group-item"} onClick={onAddTodo}>Add todo</li>
        <li className={"list-group-item"} onClick={onDeleteTodo}>Delete todo{selectedTodos.length > 1 ? "s" : ""}</li>
      </ul>
    </>
  )
}
