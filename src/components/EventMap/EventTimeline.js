import React from 'react';
import { Button } from 'react-bootstrap';
import { find } from 'lodash';
import { getLabel as l, parseDate } from '../../utils';

import PinPoint from './icons/PinPoint';
import playIcon from './icons/play.png';
import pauseIcon from './icons/pause.png';
import '../../styles/components/EventMap/EventTimeline.scss';


const EventTimeline = ({
    events          = [],
    selectedEvents  = [],
    isPlaying       = false,
    onEventClick,
    onPlayClick
  }) => {

  return (
    <div className={`EventTimeline ${isPlaying ? 'open' : ''}`}>
      {events.length &&
        <div className="tools">
          <Button
            variant   = "link"
            className = {isPlaying ? 'enabled' : null}
            onClick   = {onPlayClick}
          >
            <img src={isPlaying ? pauseIcon : playIcon} />
          </Button>
        </div>
      }
      <div className="side-menu">
        <div className="title">Lifetime</div>
        <div className="event-list">
          {events.map((event, i) =>
            <div
              className = {`item ${find(selectedEvents, event) ? 'selected' : ''}`}
              key       = {event.slug}
              onClick   = {_ => onEventClick([event])}
            >
              <div className="icon">
                <PinPoint label={String.fromCharCode(65 + i)} />
              </div>
              <div className="info">
                <span className="type">
                  {l(`event.${event.data.event_type}`)}
                </span>
                <span className="details">
                  {parseDate(event.data.date)}. {event.data.place.title}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default EventTimeline;
