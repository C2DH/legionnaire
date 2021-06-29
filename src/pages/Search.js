import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { SearchRoute } from '../constants';

const Search = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{SearchRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Search;
