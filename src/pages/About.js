import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { AboutRoute } from '../constants';
import PlayIcon from '../components/EventMap/icons/play.svg';

const About = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{AboutRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
      <div style={{ backgroundColor: 'black', width: '200px', height: '200px', display: 'flex', padding: '50px' }}>
        <img src={PlayIcon} />
      </div>
    </Container>
  )
}

export default About;
