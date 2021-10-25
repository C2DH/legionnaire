import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetPlace, useGetEventsByPersonId } from '../hooks';
import { getLabel as l, parseDate } from '../utils';
import EventMap from '../components/EventMap';
import { PersonRoute } from '../constants';

import '../styles/pages/Place.scss';

const Person = () => {

  const { slug } = useParams();
  const [{ place }] = useGetPlace(slug);
  const [{ events, eventsByType }] = useGetEventsByPersonId(place?.id);


  return (
    <div className="Person">
      <div className="position-sticky">
        <Container>
          <Row>
            <Col>
              <h1 className="my-2">{place?.data?.title}</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <EventMap events={events} className="my-5" />

      <Container className="mt-5">
        {Object.keys(eventsByType).map(type =>
          <div key={type} className="mt-3">
            <Row>
              <Col>
                  <h2>{l(`event.${type}`)} ({eventsByType[type].length})</h2>
              </Col>
            </Row>
            <Row>
              {eventsByType[type].map(event =>
                <Col key={event.slug} md={6}>
                  <Row className="event">
                    <Col xs="4">
                      {event.data.date && parseDate(event.data.date, true)}
                    </Col>
                    <Col xs="8">
                      <Link to={`${PersonRoute.to}${event.person.slug}`}>
                        {event.person.title}
                      </Link>
                    </Col>
                  </Row>
                </Col>
              )}
            </Row>
          </div>
        )}
      </Container>

    </div>
  )
}

export default Person;
