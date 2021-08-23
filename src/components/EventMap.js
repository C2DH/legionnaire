import React, { useState } from 'react';
import ReactMapboxGl, {
  Marker,
  Cluster,
  Popup,
  ZoomControl,
} from 'react-mapbox-gl';
import mapboxgl from 'mapbox-gl';
//import mapboxgl from 'mapbox-gl/dist/mapbox-gl-csp';
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker'; // eslint-disable-line import/no-webpack-loader-syntax
import { find } from 'lodash';
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
  faCross
} from '@fortawesome/free-solid-svg-icons';

import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/components/EventMap.scss';

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
})


const EventMap = ({ events }) => {

  const [zoom, setZoom]                     = useState([5.3]);
  const [center, setCenter]                 = useState([2.1008033, 47.6148384]);
  const [selectedEvents, setSelectedEvents] = useState(null);

  const clusterMarker = (coordinates, pointCount, getLeaves) => {

    const r             = 15 + pointCount;
    const clickHandler  = () => {
      if(zoom >= 10)
        marker_clickHandler(
          getLeaves().map(marker =>
            find(events, {id:parseInt(marker.key)})
          )
        )
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
          fontSize: 12 + pointCount
        }}
      >
        { pointCount }
      </Marker>
    );
  }

  const move = (coordinates, zoom) => {
    setCenter(coordinates);
    setZoom([zoom]);
  }

  const marker_clickHandler = event => {
    setSelectedEvents(event);
    setCenter(event[0].coordinates);
  }

  return (
    <Map
      style           = {`mapbox://styles/legionnaires/cksklcprka4vr18ntizab6qea`}
      center          = {center}
      zoom            = {zoom}
      className       = "EventMap"
      onClick         = {() => setSelectedEvents(null)}
      onZoomEnd       = {e => move(e.transform._center, e.transform._zoom)}
    >
      <ZoomControl position="topLeft" className="zoomControl"/>
      <Cluster
        ClusterMarkerFactory  = {clusterMarker}
        zoomOnClick           = {zoom < 10}
        zoomOnClickPadding    = {100}
        maxZoom               = {20}
      >
        {events?.map(event => (
          <Marker
            key         = {event.id}
            coordinates = {event.coordinates}
            className   = "marker"
            onClick     = {() => marker_clickHandler([event])}
          >
            <FontAwesomeIcon icon={icons[event.data.event_type]} />
          </Marker>
        ))}
      </Cluster>

      {selectedEvents && (
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
              {event.data.date} - {event.title}
            </div>
          ))}
        </Popup>
      )}

    </Map>
  )
}

export default EventMap;
