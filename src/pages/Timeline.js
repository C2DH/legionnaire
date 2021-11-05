import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import TimelineEventCard from '../components/TimelineEventCard';
import { useGetTimelineEvents } from '../hooks';
import { TimelineRoute } from '../constants';

import '../styles/pages/Timeline.scss';

const Timeline = () => {

  const [{ eventsByYear }] = useGetTimelineEvents();

  return (
    <Container className="Timeline">
      <Row>
        <Col>
          <h1>{TimelineRoute.label}</h1>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col lg={6}>
          {Object.entries(eventsByYear).map(([year, events]) =>
            <div key={year}>
              <h2>{year}</h2>

              {events.map(event =>
                <TimelineEventCard key={event.slug} event={event} />
              )}
            </div>
          )}
        </Col>
      </Row>
    </Container>
  )
}

export default Timeline;
