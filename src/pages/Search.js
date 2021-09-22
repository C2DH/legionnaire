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
import { useSearch, useGetEventsByPersonId } from '../hooks';
import { parseYear } from '../utils';
import { PersonRoute } from '../constants.js';

import '../styles/pages/Search.scss';


const EVENT_TYPE_FILTER = ["birth", "death"];


const PersonRecord = ({ slug, name, place, birthYear, deathYear }) => (
  <Row className="PersonRecord my-2" key={slug}>
    <Col xs={12} md={5}>
      <Link to={`${PersonRoute.to}${slug}`}>
        {name}
      </Link>
    </Col>
    <Col xs="auto" md={5}>{place}</Col>
    <Col>
      {birthYear}
      {deathYear &&
        <span> - {deathYear}</span>
      }
    </Col>
  </Row>
);


const Search = () => {

  const queryField              = useRef(null);
  const [query, setQuery]       = useQueryParams({
    q: withDefault(StringParam, '')
  });
  const [{ people, peopleIds }] = useSearch(query.q);
  const [{ eventsByType }]      = useGetEventsByPersonId(peopleIds, EVENT_TYPE_FILTER);

  const searchForm_submitHandler = e => {
    const q = queryField.current.value;
    setQuery({q: q.length ? q : undefined});
    e.preventDefault();
  }

  return (
    <Container className="Search">
      <Row>
        <Col md={9}>
          <Form className="search-form my-4" onSubmit={searchForm_submitHandler}>
            <Form.Control className="search-input" name="q" ref={queryField} />
            <FontAwesomeIcon icon={faSearch} />
          </Form>
        </Col>
      </Row>

      <Row className="my-5">
        <Col md={9}>
          {query && people &&
            <React.Fragment>
              <h2>Légionnaires</h2>
              {people.map(person =>
                <PersonRecord
                  slug      = {person.slug}
                  key       = {person.slug}
                  name      = {person.title}
                  place     = {eventsByType[person.id]?.birth?.[0].data.place.title}
                  birthYear = {parseYear(eventsByType[person.id]?.birth?.[0].data.date)}
                  deathYear = {parseYear(eventsByType[person.id]?.death?.[0].data.date)}
                />
              )}
            </React.Fragment>
          }
        </Col>
      </Row>
    </Container>
  )
}

export default Search;
