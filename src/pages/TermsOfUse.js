import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { TermsOfUseRoute } from '../constants';

const TermsOfUse = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{ TermsOfUseRoute.label.toUpperCase() }</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default TermsOfUse
