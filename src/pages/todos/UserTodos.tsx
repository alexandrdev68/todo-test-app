/**
 * created 28.10.2024
 */
import { useCallback, useEffect, useMemo } from "react"
import classes from "./UserTodos.module.css"
import { Typography } from "../../components/typography/Typography"
import { useParams } from "react-router-dom"
import { userTodosSlice } from "./userTodosSlice"
import { useGetTodosMutation, useUpdateTodoMutation } from "./userTodosAPI"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { DataGrid } from "../../features/grid/DataGrid"
import { LeftMenu } from "./components/LeftMenu"
import type { ValueGetterParams, ValueSetterParams } from "@ag-grid-community/core"
import type { LandingItem} from "../landing/landingAPI";
import { useGetLandingItemByIdMutation } from "../landing/landingAPI"


export function UserTodos() {
  const { user_id } = useParams<{ user_id: string }>()
  const dispatch = useAppDispatch()
  const [getTodos] = useGetTodosMutation()
  const [updateTodoService, {isLoading: updateLoading}] = useUpdateTodoMutation()
  const [getUser, { isLoading }] = useGetLandingItemByIdMutation()
  const { updateSelectedTodos, storeTodosList, updateTodoItem, storeUserData } = userTodosSlice.actions
  const { selectTodos, selectUserData } = userTodosSlice.selectors
  const todos = useAppSelector(selectTodos)
  const userData = useAppSelector(selectUserData)


  useEffect(() => {
    if (user_id) {
      fetch(user_id)
    }

    return () => {
      dispatch(storeUserData({}))
      dispatch(storeTodosList([]))
    }
  }, [user_id])

  const fetch = (userId: string) => {
    getTodos(userId).then((response) => {
      if (Array.isArray(response.data)) {
        dispatch(storeTodosList(response.data))
      }
    })
    getUser(userId).then((response) => {
      dispatch(storeUserData(response.data as LandingItem))
    })
  }

  const columnDefs = useMemo(() => {
    return [
      {
        field: "title",
        headerName: "Title",
        editable: true,
        valueGetter: (params: ValueGetterParams) => {
          return params.data.title
        },
        valueSetter: (params: ValueSetterParams) => {
          const newTitle = params.newValue || ""
          const data = params.data

          if (data.title !== newTitle) {
            const updatedTodo = { ...data, title: newTitle }
            updateTodoService(updatedTodo).then((response) => {
              dispatch(updateTodoItem(updatedTodo))
            })
            return true
          } else {
            // return false, the grid doesn't need to update
            return false
          }
        }
      },
      {
        field: "completed",
        headerName: "Completed",
        editable: true,
        valueSetter: (params: ValueSetterParams) => {
          const updatedTodo = { ...params.data, completed: params.newValue }
          updateTodoService(updatedTodo).then((response) => {
            dispatch(updateTodoItem(updatedTodo))
          })
          return true
        }
      }
    ]
  }, [dispatch, updateTodoItem])

  const onRowSelected = useCallback((row: any) => {
    dispatch(updateSelectedTodos(row.data))
  }, [dispatch, updateSelectedTodos])


  return (
    <>
      <div className={classes["todos-container"]}>
        <div className={classes["left-part"]}>
          <LeftMenu user_id={user_id || ""} />
        </div>
        <div className={classes["right-part"]}>
          <Typography variant={"h4"}>{userData.name} todo list:</Typography>
          <DataGrid
            columnDefs={columnDefs}
            loading={isLoading || updateLoading}
            onRowSelected={onRowSelected}
            gridOptions={{
              rowSelection: { mode: "multiRow" }
            }}
            rowData={todos || []}
          />
        </div>
      </div>
    </>
  )
}
