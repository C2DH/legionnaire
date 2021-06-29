import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { CollectionRoute } from '../constants';

const Collection = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{CollectionRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Collection;
