import React, { useState } from 'react';
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
import { parseDate } from '../utils';

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


const EventMap = ({ events, className }) => {

  const [zoom, setZoom]                     = useState([5.3]);
  const [center, setCenter]                 = useState([2.1008033, 47.6148384]);
  const [selectedEvents, setSelectedEvents] = useState(null);

  const clusterMarker = (coordinates, pointCount, getLeaves) => {

    const r             = 15 + pointCount;
    const clickHandler  = () => {

      const clusterEvents = getLeaves()
        .map(marker => find(events, {id:parseInt(marker.key)}))

      // Check if all events are at the same place
      if(clusterEvents.filter(event => event.data.place.id !== clusterEvents[0].data.place.id).length === 0) {
        marker_clickHandler(clusterEvents);
        //  To fix an issue with the zoomOnClick: The first setCenter block the zoom. The second is needed to center the marker
        setTimeout(_ => setCenter(clusterEvents[0].coordinates));
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
      style                   = {`mapbox://styles/legionnaires/cksklcprka4vr18ntizab6qea`}
      className               = {`EventMap ${className}`}
      center                  = {center}
      zoom                    = {zoom}
      renderChildrenInPortal  = {true}
      onClick                 = {() => setSelectedEvents(null)}
      onZoomEnd               = {map => move(map.transform._center, map.transform._zoom)}
    >
      <ZoomControl position="topLeft" className="zoomControl"/>
      <Cluster
        ClusterMarkerFactory  = {clusterMarker}
        zoomOnClick           = {true}
        zoomOnClickPadding    = {100}
        maxZoom               = {20}
      >
        {events?.map(event => (
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
  )
}

export default EventMap;
