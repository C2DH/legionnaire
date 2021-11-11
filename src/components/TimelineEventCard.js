import React from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'react-bootstrap';
import { parseDate } from '../utils';
import { MediaRoute } from '../constants';

import '../styles/components/TimelineEventCard.scss';


const TimelineEventCard = ({ event }) => (
  <Row className="TimelineEventCard mt-3">
    <Col className="thumbnails ms-md-5">
      {event.documents.map(media =>
        <Link key={media.slug} to={`${MediaRoute.to}${media.slug}`}>
          <img src={media.data.resolutions?.thumbnail.url} alt={media.data.title} />
        </Link>
      )}
    </Col>
    <Col className="details ps-0">
      <div className="caption">
        {event.data.title}
      </div>
      <div className="linkbar">
        {event.data.url &&
          <a
            href    = {event.data.url}
            target  = "_blank"
            rel     = "noreferrer"
          >
            ARCHIVE
          </a>
        }

        <span className="date">
          {parseDate(event.data.date)}
        </span>
      </div>
    </Col>
  </Row>
);

export default TimelineEventCard;
