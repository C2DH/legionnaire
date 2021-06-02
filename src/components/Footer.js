import { Container, Row, Col, Nav } from 'react-bootstrap'
import {
  HomeRoute,
  AboutRoute,
  TermsOfUseRoute
} from '../constants'

const now = new Date()

const Footer = ()=> {

  return (
    <Container>
      <Row>
        <Col>Copyright © <a href="https://www.uni.lu/">University of Luxembourg</a> {now.ge}</Col>
        <Col>
          <Nav className="flex-column">
            <Nav.Item><Nav.Link href={HomeRoute.to} exact>{HomeRoute.label}</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href={AboutRoute.to} exact>{AboutRoute.label}</Nav.Link></Nav.Item>
            <Nav.Item><Nav.Link href={TermsOfUseRoute.to} exact>{TermsOfUseRoute.label}</Nav.Link></Nav.Item>
          </Nav>
        </Col>
        <Col>
          View sourcecode of this version: <a href={`https://github.com/C2DH/legionnaire/commit/${process.env.REACT_APP_GIT_REVISION}`}>
          {process.env.REACT_APP_GIT_BRANCH}/{process.env.REACT_APP_GIT_REVISION}
          </a>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
