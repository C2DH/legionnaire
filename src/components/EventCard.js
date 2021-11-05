import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { getLabel as l, parseDate } from '../utils';
import { PlaceRoute } from '../constants.js';

import '../styles/components/EventCard.scss';


const Event = ({ type, events }) => (
  <Row className="mb-1 EventCard">
    <Col sm={5}>
      <h2>{l(`event.${type}.date`)}</h2>
      {events.map(event =>
        <div key={event.slug}>{event.data.date && parseDate(event.data.date, true)}</div>
      )}
    </Col>
    <Col>
      <h2>{l(`event.${type}.place`)}</h2>
      {events.map(event =>
        <div key={event.slug}>
          {event.place &&
            <Link to={`${PlaceRoute.to}${event.place.slug}`}>
              {event.place.data.city} ({event.place.data.country})
            </Link>
          }
          &nbsp;
        </div>
      )}
    </Col>
  </Row>
);

export default Event;
