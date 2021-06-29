import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useDocument } from '@c2dh/react-miller';

const Person = () => {

  const { slug } = useParams();
  const [person, { error, pending }] = useDocument(slug);

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{person?.data?.title}</h1>
        </Col>
      </Row>
    </Container>
  )
}

export default Person;
