import { useCallback, useEffect } from "react"
import classes from "./Landing.module.css"
import { useGetLandingItemsMutation } from "./landingAPI"
import { selectCols, selectUsers, storeUsers } from "./landingSlice"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { Button, Col, Container, Row } from "react-bootstrap"
import { useNavigate } from "react-router-dom"
import { PATH } from "../../constants/main"
import { DataGrid } from "../../features/grid/DataGrid"
import { UsersGuide } from "./components/UsersGuide"


export function Landing() {
  const [getUsers, { isLoading }] = useGetLandingItemsMutation()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const colDefs = useAppSelector(selectCols)
  const users = useAppSelector(selectUsers)

  useEffect(() => {
    fetch()
  }, [])

  const fetch = () => {
    getUsers().then((response) => {
      dispatch(storeUsers(response.data || []))
    })
  }

  const onRowClicked = useCallback((row: any) => {
    if (row?.data?.id) {
      navigate(PATH.todo.getURI(row?.data?.id))
    }
  }, [])

  return (
    <>
      <div className={classes["landing-container"]}>
        <UsersGuide />
        <DataGrid
          containerClassname={classes["table-container"]}
          columnDefs={colDefs}
          rowData={users}
          loading={isLoading}
          onRowClicked={onRowClicked}
        />
        <Container style={{ paddingTop: 16 }}>
          <Row>
            <Col xs={12} className="justify-content-md-center" style={{textAlign: "center"}}>
              <Button
                type={"submit"}
                variant={"light"}
                title={"Get users"}
                onClick={fetch}
              >Get users</Button>
            </Col>
          </Row>
        </Container>
      </div>
    </>
  )
}
