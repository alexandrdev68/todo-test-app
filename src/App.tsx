import "./App.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "ag-grid-community/styles/ag-grid.css"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { Layout } from "./components/layout/Layout"
import { PATH } from "./constants/main"
import { Landing } from "./pages/landing/Landing"
import { UserTodos } from "./pages/todos/UserTodos"
import { SummaryPage } from "./pages/summary/SummaryPage"

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route index path={PATH.landing.getURI()} element={<Landing />} />
          <Route path={PATH.todo.getURI()} element={<UserTodos />} />
          <Route path={PATH.summary.getURI()} element={<SummaryPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
