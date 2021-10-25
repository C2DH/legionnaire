import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Form } from 'react-bootstrap';
import {
  useQueryParams,
  StringParam,
  withDefault,
} from 'use-query-params'
import { find } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch  } from '@fortawesome/free-solid-svg-icons';
import {
  useSearchPeople,
  useSearchPlaces,
  useGetEventsByPersonId
} from '../hooks';
import { parseYear } from '../utils';
import { PersonRoute, PlaceRoute } from '../constants.js';

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
  const [{ people, peopleIds }] = useSearchPeople(query.q);
  const [{ places }]            = useSearchPlaces(query.q);
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
            <Form.Control className="search-input" name="q" ref={queryField} defaultValue={query.q} />
            <FontAwesomeIcon icon={faSearch} />
          </Form>
        </Col>
      </Row>

      {query.q && people.length === 0 && places.length === 0 &&
        <Row className="my-5">
          <Col>Aucun résultats trouvé</Col>
        </Row>
      }

      {query.q && people.length > 0 &&
        <Row className="my-5">
          <Col md={9}>
            <h2>Légionnaires</h2>
            {people.map(person =>
              <PersonRecord
                slug      = {person.slug}
                key       = {person.slug}
                name      = {person.title}
                place     = {find(eventsByType.birth, ["person.id", person.id])?.place.title}
                birthYear = {parseYear(find(eventsByType.birth, ['person.id', person.id])?.data.date)}
                deathYear = {parseYear(find(eventsByType.death, ['person.id', person.id])?.data.date)}
              />
            )}
          </Col>
        </Row>
      }

      {query.q && places.length > 0 &&
        <Row className="my-5">
          <Col md={9}>
            <h2>Places</h2>
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

    </Container>
  )
}

export default Search;
