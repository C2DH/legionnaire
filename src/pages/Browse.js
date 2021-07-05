import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BrowseRoute } from '../constants';
import { useGetPersons } from '../hooks';

const Browse = () => {

  const [{ persons }] = useGetPersons();

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{BrowseRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
      {persons && persons.map(person => {
        return (
          <Row key={person.slug}>
            <Col>
              <Link to={`/browse/person/${person.slug}`}>
                {person.data.title}
              </Link>
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default Browse;
