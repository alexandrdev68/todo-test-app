import classes from "./Layout.module.css"
import { Outlet } from "react-router-dom"
import { TopMenu } from "../topmenu/TopMenu"


export function Layout() {
  return (
    <div className={classes["main-container"]}>
      <div className={classes["menu-container"]}>
        <TopMenu />
      </div>
      <div className={classes["page-container"]}><Outlet /></div>
    </div>
  )
}
