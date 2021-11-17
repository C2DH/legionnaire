import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import TimelineEventCard from '../components/TimelineEventCard';
import { useGetTimelineEvents, useGetStaticPage } from '../hooks';
import { TimelineRoute } from '../constants';

import '../styles/pages/Timeline.scss';


const Timeline = () => {

  const [{ eventsByYear }]  = useGetTimelineEvents();
  const [{ page }]          = useGetStaticPage(TimelineRoute.slug);

  return (
    <Container className="Timeline">
      <Row className="mt-3 gx-5">

        <Col>
          <ReactMarkdown linkTarget="_blank" className="abstract">
            {page?.data.abstract}
          </ReactMarkdown>
        </Col>

        <Col lg={{ span: 6, order: 'first' }}>
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
