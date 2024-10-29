/**
 * created 29.10.2024
 */
import { useMemo } from "react"
import type { AgGridReactProps } from "ag-grid-react"
import { AgGridReact } from "ag-grid-react"
import type {
  SizeColumnsToContentStrategy,
  SizeColumnsToFitGridStrategy,
  SizeColumnsToFitProvidedWidthStrategy
} from "@ag-grid-community/core"
import classes from "./DataGrid.module.css"

interface DataGridComponentType extends AgGridReactProps {
  containerClassname?: string;
  columnDefs: any;
}

export function DataGrid(props: DataGridComponentType) {

  const { containerClassname = classes["data-grid-container"], ...omitted }
    = useMemo(() => props, [props])

  const autoSizeStrategy = useMemo<
    | SizeColumnsToFitGridStrategy
    | SizeColumnsToFitProvidedWidthStrategy
    | SizeColumnsToContentStrategy
  >(() => {
    return {
      type: "fitGridWidth"
    }
  }, [])

  return (
    <>
      <div className={`ag-theme-quartz ${containerClassname}`}>
        <AgGridReact
          autoSizeStrategy={autoSizeStrategy}
          {...omitted}
        />
      </div>
    </>
  )
}
