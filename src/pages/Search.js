import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
  useQueryParams,
  StringParam,
  withDefault,
} from 'use-query-params'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import EventMap from '../components/EventMap';
import { useSearch } from '../hooks';
import { PersonRoute, PlaceRoute } from '../constants.js';

import '../styles/pages/Search.scss';

const Search = () => {

  const queryField                                = useRef(null);
  const [query, setQuery]                         = useQueryParams({
    q: withDefault(StringParam, '')
  });
  const [{ people, places, events }] = useSearch(query.q);


  const searchForm_submitHandler = e => {
    const q = queryField.current.value;
    setQuery({q: q.length ? q : undefined});
    e.preventDefault();
  }


  return (
    <div className="Search">

      <Container>
        <Row>
          <Col>
            <Form className="search-form my-4" onSubmit={searchForm_submitHandler}>
              <Form.Control className="search-input" name="q" ref={queryField} defaultValue={query.q} />
              <FontAwesomeIcon icon={faSearch} />
            </Form>
          </Col>
        </Row>
      </Container>

      <Container>
        <Row>
          {query.q &&
            <Col md={4}>
              {query.q && people.length === 0 && places.length === 0 &&
                <Row className="my-5">
                  <Col>Aucun résultats trouvé</Col>
                </Row>
              }

              {query.q && people.length > 0 &&
                <Row className="my-5">
                  <Col>
                    <h2>Légionnaires</h2>
                    {people.map(person =>
                      <Row className="my-2" key={person.slug}>
                        <Col>
                          <Link to={`${PersonRoute.to}${person.slug}`}>
                            {person.title}
                          </Link>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              }

              {query.q && places.length > 0 &&
                <Row className="my-5">
                  <Col>
                    <h2>Lieux</h2>
                    {places.map(place =>
                      <Row key={place.slug} className="my-2">
                        <Col>
                          <Link to={`${PlaceRoute.to}${place.slug}`}>
                            {place.title}
                          </Link>
                        </Col>
                      </Row>
                    )}
                  </Col>
                </Row>
              }
            </Col>
          }

          <Col>
            <EventMap events={events} fitBoundsOnLoad={true} className="my-5" />
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Search;
