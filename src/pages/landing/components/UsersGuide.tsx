/**
 * created 29.10.2024
 */
import { Col, Container, Row } from "react-bootstrap"
import { Typography } from "../../../components/typography/Typography"


export function UsersGuide() {
  return (
    <>
      <Container>
        <Row>
          <Col xs={12}>
            <Typography variant={'h6'} component={'p'}>
              Theres is users list, that have some todo list.
            </Typography>
            <Typography variant={'h6'} component={'p'}>
              Please press on user row if you want to manage todos.
            </Typography>
            <Typography variant={'h6'} component={'p'}>
              Press "Get users" button to refresh the page.
            </Typography>
          </Col>
        </Row>
      </Container>
    </>
  );
}
