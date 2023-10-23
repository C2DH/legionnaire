import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom';
import {
  TermsOfUseRoute
} from '../constants'

import { ReactComponent as LogoUni } from '../images/logo_unilu.svg';


const now = new Date()

const Footer = ()=> {

  return (
    <Container as="footer" className="py-5">
      <Row>
        <Col className="text-center" md={3}>
          <a
            href      = "https://wwwfr.uni.lu/"
            target    = "_blank"
            className = "logo"
            rel       = "noreferrer"
            >
            <LogoUni />
          </a>
        </Col>
        <Col className="text-center">Copyright © <a href="https://www.uni.lu/">University of Luxembourg</a> {now.getFullYear()}</Col>
        <Col className="text-center" md={3}>
          <Link to={TermsOfUseRoute.to}>{TermsOfUseRoute.label}</Link>
        </Col>
      </Row>
    </Container>
  )
}

export default Footer
