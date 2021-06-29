import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { BrowseRoute } from '../constants';

const Browse = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{BrowseRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Browse
