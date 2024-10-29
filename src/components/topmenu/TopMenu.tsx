/**
 * created 28.10.2024
 */
import { useCallback, useMemo } from "react"
import { Col, Container, Row } from "react-bootstrap"
import { PATH } from "../../constants/main"
import { Link, useNavigate } from "react-router-dom"
import classes from "./TopMenu.module.css"
import { Typography } from "../typography/Typography"

const menuItems = [
  { title: "Landing", uri: PATH.landing.getURI() },
  { title: "Summary", uri: PATH.summary.getURI() }
]

export function TopMenu() {
  const navigate = useNavigate()
  const renderedItems = useMemo(() => {
    return menuItems.map((menuItem) => (
      <Col xs={2} key={menuItem.uri} style={{ textAlign: "center" }}>
        <Link to={menuItem.uri} className={classes["top-menu-items"]}>{menuItem.title}</Link>
      </Col>
    ))
  }, [])

  const onBack = useCallback(() => {
    navigate(-1)
  }, [navigate]);

  return (
    <>
      <Container>
        <Row>
          <Col xs={1} onClick={onBack} className={classes["hover-menu-item"]}>
            <Typography variant={"h5"}>{"< Back"}</Typography>
          </Col>
          <Col xs={'10'}>
            <Row className="justify-content-md-center">
              {renderedItems}
            </Row>
          </Col>
          <Col xs={1}></Col>
        </Row>
      </Container>

    </>
  )
}
