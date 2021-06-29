import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { useDocuments } from '@c2dh/react-miller'
import { BrowseRoute } from '../constants';

const Browse = () => {

  const [documents, pagination, { loading, error }] = useDocuments({
    limit: 1000,
    offset: 0,
    filters: {
      data__type: 'person'
    }
  });

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="my-5">{BrowseRoute.label.toUpperCase()}</h1>
        </Col>
      </Row>
      {documents && documents.map(doc => {
        return (
          <Row key={doc.slug}>
            <Col>
              <Link to={`/browse/person/${doc.slug}`}>
                {doc.data.title}
              </Link>
            </Col>
          </Row>
        )
      })}
    </Container>
  )
}

export default Browse;
