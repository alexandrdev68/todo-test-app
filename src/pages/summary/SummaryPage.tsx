import { useMemo } from "react"
import classes from "./SummaryPage.module.css"
import { DataGrid } from "../../features/grid/DataGrid"
import { useGetAllTodosQuery } from "../todos/userTodosAPI"
import { useAppSelector } from "../../app/hooks"
import { selectUsers } from "../landing/landingSlice"


const colDefs = [
  { field: "name", headerName: "Name", fieldType: "string" },
  { field: "complete_todos", headerName: "Complete todos", fieldType: "string" },
  { field: "incomplete_todos", headerName: "Incomplete todos", fieldType: "string" }
]

type GroupedType = { [key: string]: { completed: number; uncompleted: number } };

export function SummaryPage() {
  const { data, isLoading } = useGetAllTodosQuery()
  const users = useAppSelector(selectUsers)

  const loading = useMemo(() => isLoading, [isLoading])

  const transformedRows = useMemo(() => {
    if (!loading && Array.isArray(data) && Array.isArray(users)) {
      const groupedData = data.reduce((acc: GroupedType, curr): GroupedType => {
        const currUserKey = `user_${curr.userId}`
        const isExistsCompleted = acc[currUserKey]?.completed !== undefined
        const isExistsUncompleted = acc[currUserKey]?.uncompleted !== undefined
        const currSummary = curr.completed ? {
            completed: isExistsCompleted ? acc[currUserKey].completed + 1 : 1,
            uncompleted: acc[currUserKey]?.uncompleted || 0
          }
          : {
            uncompleted: isExistsUncompleted ? acc[currUserKey].uncompleted + 1 : 1,
            completed: acc[currUserKey]?.completed || 0
          }
        return { ...acc, [currUserKey]: { ...currSummary } }
      }, {})

      return users.map((user) => {
        const currUserKey = `user_${user.id}`
        return {
          name: user.name,
          complete_todos: groupedData[currUserKey]?.completed || 0,
          incomplete_todos: groupedData[currUserKey]?.uncompleted || 0
        }
      })
    }
    return []
  }, [data, users, loading])

  return (
    <>
      <div className={classes["summary-container"]}>
        <DataGrid columnDefs={colDefs} rowData={transformedRows} />
      </div>
    </>
  )
}
