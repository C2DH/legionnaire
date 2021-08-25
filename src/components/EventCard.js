import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { getLabel as l, parseDate } from '../utils';

import '../styles/components/EventCard.scss';


const Event = ({ type, events }) => (
  <Row className="mb-1 EventCard">
    <Col sm={5}>
      <h2>{l(`event.${type}.date.title`)}</h2>
      {events.map(event =>
        <div key={event.slug}>{event.data.date && parseDate(event.data.date, true)}</div>
      )}
    </Col>
    <Col>
      <h2>{l(`event.${type}.place.title`)}</h2>
      {events.map(event =>
        <div key={event.slug}>
          {event.data.place.data.city} ({event.data.place.data.country})
        </div>
      )}
    </Col>
  </Row>
);

export default Event;
