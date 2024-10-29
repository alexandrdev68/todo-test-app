import { createSlice, type PayloadAction } from "@reduxjs/toolkit"
import type { LandingItem } from "./landingAPI"

export interface LandingSliceState {
  colDefs: any;
  users: Array<LandingItem>
}

const initialState: LandingSliceState = {
  colDefs: [
    { field: "name", headerName: "Name", sortable: true, sort: "asc" },
    { field: "username", headerName: "User name" },
    { field: "email", headerName: "Email" },
    { field: "company.name", headerName: "Company name" }
  ],
  users: []
}

export const landingSlice = createSlice({
  name: "landing",
  initialState,
  reducers: create => ({
    storeUsers: create.reducer((state: LandingSliceState, action: PayloadAction<Array<LandingItem>>) => {
        state.users = [...action.payload]
      }
    )
  }),
  selectors: {
    selectCols: state => state.colDefs,
    selectUsers: state => state.users,
  }
})

export const { selectCols, selectUsers } = landingSlice.selectors
export const { storeUsers } = landingSlice.actions
