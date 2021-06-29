import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AboutRoute } from '../constants';

const About = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{AboutRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default About;
