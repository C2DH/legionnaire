import React, { useState, useEffect, useCallback } from 'react';
import { Button } from 'react-bootstrap';
import ReactMapboxGl, {
  Marker,
  Cluster,
  Popup,
  ZoomControl,
  MapContext
} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // eslint-disable-line import/no-webpack-loader-syntax
import { find, findIndex, last } from 'lodash';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBirthdayCake,
  faSkullCrossbones,
  faHome,
  faRing,
  faUserInjured,
  faFileSignature,
  faBabyCarriage,
  faWarehouse,
  faMapSigns,
  faMonument,
  faSignOutAlt,
  faHospitalSymbol,
  faCross,
  faCirclePlay
} from '@fortawesome/free-solid-svg-icons';
import { getLabel as l, parseDate } from '../../utils';

import 'mapbox-gl/dist/mapbox-gl.css';
import AnimatedLineLayer from './AnimatedLineLayer';
import '../../styles/components/EventMap.scss';

const icons = {
  birth: faBirthdayCake,
  death: faSkullCrossbones,
  residence: faHome,
  wedding: faRing,
  wounded: faUserInjured,
  enrollment: faFileSignature,
  child: faBabyCarriage,
  depot: faWarehouse,
  journey: faMapSigns,
  monument: faMonument,
  reform: faSignOutAlt,
  hospital: faHospitalSymbol,
  burial: faCross
}

// Load worker code separately with worker-loader
mapboxgl.workerClass = MapboxWorker; // Wire up loaded worker to be used instead of the default

const Map = ReactMapboxGl({
  accessToken: "pk.eyJ1IjoibGVnaW9ubmFpcmVzIiwiYSI6ImNrcm02cGxvYTAwa2IzMm85MG02b2VqMjYifQ.OuFSbi7i0SVS8O8QnOjpKA"
});

const FITBOUNDS_OPTIONS = {padding: 200};

const EventMap = ({ events = [], className }) => {

  const [center, setCenter]                   = useState([2.1008033, 47.6148384]);
  const [fitBounds, setFitBounds]             = useState(null);
  const [selectedEvents, setSelectedEvents]   = useState(null);
  const [lineCoordinates, setLineCoordinates] = useState([]);
  const [isPlaying, setPlaying]               = useState(false);


  useEffect(_ => {
    if(events.length === 0) return;

    let bounds = new mapboxgl.LngLatBounds();
    events.forEach(event => bounds.extend(event.coordinates));
    setFitBounds(bounds.toArray());

    const coordinates = events.slice(0, -1).map((event, i) => [
        event.id,
        parseFloat(event.coordinates[0]),
        parseFloat(event.coordinates[1]),
        parseFloat(events[i+1].coordinates[0]),
        parseFloat(events[i+1].coordinates[1]),
        50
    ]);

    setLineCoordinates(coordinates);
  }, [events]);


  const nextEvent = useCallback(eventId => {
    if(!isPlaying) return;

    let i           = findIndex(events, {id: eventId});

    if(i === events.length - 1) {
      setPlaying(false);
      return;
    }

    const selEvents = [events[++i]];
    const placeId   = selEvents[0].data.place.id;

    //  Check if next events have the same place
    events.slice(i+1).reduce((isNext, event) => isNext && event.data.place.id === placeId && selEvents.push(event), true);

    setSelectedEvents(selEvents);
  //  setCenter(selEvents[0].coordinates);

  }, [events, isPlaying]);


  useEffect(_ => {
    if(isPlaying && selectedEvents) {

      const i = findIndex(events, selectedEvents[0]);

      if(i > 0) {
        setFitBounds([events[i-1].coordinates, events[i].coordinates]);
        setLineCoordinates(lineCoordinates =>
          [...lineCoordinates, [
            last(selectedEvents).id,
            parseFloat(events[i-1].coordinates[0]),
            parseFloat(events[i-1].coordinates[1]),
            parseFloat(events[i].coordinates[0]),
            parseFloat(events[i].coordinates[1])
          ]]
        );
      } else {
        setTimeout(_ => nextEvent(last(selectedEvents).id), 2000);
      }
    }
  }, [selectedEvents, isPlaying, events, nextEvent]);


  const clusterMarker = (coordinates, pointCount, getLeaves) => {

    const r             = 15 + pointCount;
    const clickHandler  = () => {

      const clusterEvents = getLeaves()
        .map(marker => find(events, {id: parseInt(marker.key)}))

      // Check if all events are at the same place
      if(clusterEvents.filter(event => event.data.place.id !== clusterEvents[0].data.place.id).length === 0)
        marker_clickHandler(clusterEvents);
      else {
        let bounds = new mapboxgl.LngLatBounds();
        clusterEvents.forEach(event => bounds.extend(event.coordinates));
        setFitBounds(bounds.toArray());
      }
    }

    return (
      <Marker
        coordinates = {coordinates}
        key         = {coordinates.toString()}
        className   = "cluster"
        onClick     = {clickHandler}
        style       = {{
          width: r * 2,
          height: r * 2,
          top: r,
          fontSize: 12 + pointCount
        }}
      >
        { pointCount }
      </Marker>
    );
  }

  const marker_clickHandler = event => {
    setSelectedEvents(event);
    setCenter(event[0].coordinates);
    if(isPlaying)
      setLineCoordinates([]);
  }

  const playButton_clickHandler = () => {
    if(!isPlaying) {
      let i = selectedEvents ? findIndex(events, last(selectedEvents)) + 1 : 0;
      if(i === events.length) i = 0;
      marker_clickHandler([events[i]]);
      setLineCoordinates([]);

      // if(i === 0)
      //   setTimeout(_ => setSelectedEvents([events[1]]), 2000);
    }

    setPlaying(!isPlaying);
  }


  return (
    <div className={`EventMap ${className}`}>

      <div className={`menu ${isPlaying ? 'open' : ''}`}>
        <div className="tools">
          <Button
            variant   = "link"
            className = {isPlaying ? 'enabled' : null}
            onClick   = {playButton_clickHandler}
          >
            <FontAwesomeIcon title="Lecture" icon={faCirclePlay} />
          </Button>
        </div>
        <div className="event-list">
          {events.map(event =>
            <div
              className = {`item ${find(selectedEvents, event) ? 'selected' : ''}`}
              key       = {event.slug}
              onClick   = {_ => marker_clickHandler([event])}
            >
              <div className="icon">
                <FontAwesomeIcon icon={icons[event.data.event_type]} title={l(`event.${event.data.event_type}`)} />
              </div>
              <span className="label">
                {parseDate(event.data.date)} - {l(`event.${event.data.event_type}`)}
              </span>
            </div>
          )}
        </div>
      </div>

      <Map
        style                   = {`mapbox://styles/legionnaires/ckto0cfh40okl17pmek6tmiuz`}
        className               = "map"
        center                  = {center}
        fitBounds               = {fitBounds}
        fitBoundsOptions        = {FITBOUNDS_OPTIONS}
        renderChildrenInPortal  = {true}
        onClick                 = {() => setSelectedEvents(null)}
      >
        <ZoomControl position="topLeft" className="zoomControl"/>
        <Cluster
          ClusterMarkerFactory  = {clusterMarker}
          maxZoom               = {20}
        >
          {events.map(event => (
            <Marker
              key         = {event.id}
              coordinates = {event.coordinates}
              className   = "marker"
              onClick     = {_ => marker_clickHandler([event])}
            >
              <FontAwesomeIcon icon={icons[event.data.event_type]} />
            </Marker>
          ))}
        </Cluster>

        {lineCoordinates.map((coordinates, i) => (
          <AnimatedLineLayer
            key             = {coordinates[0]}
            eventId         = {coordinates[0]}
            startX          = {coordinates[1]}
            startY          = {coordinates[2]}
            endX            = {coordinates[3]}
            endY            = {coordinates[4]}
            speed           = {coordinates[5]}
            onAnimationEnd  = {nextEvent}
          />
        ))}

        {selectedEvents && !isPlaying && (
          <Popup
            coordinates = {selectedEvents[0].coordinates}
            anchor      = "top"
            offset      = {[0, 5]}
            key         = {selectedEvents[0].id}
            className   = "popup"
          >
            <div className="title">
              {selectedEvents[0].data.place.title}
            </div>
            {selectedEvents.map(event => (
              <div key={event.id}>
                {parseDate(event.data.date)} - {event.title}
              </div>
            ))}
          </Popup>
        )}

        <MapContext.Consumer>
          {(map) => {
            map.on("wheel", e => !e.originalEvent.ctrlKey && !e.originalEvent.metaKey && e.preventDefault());
          }}
        </MapContext.Consumer>

      </Map>
    </div>
  )
}

export default EventMap;
