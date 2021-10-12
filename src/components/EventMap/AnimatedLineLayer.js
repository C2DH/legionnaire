import React, { useState, useEffect } from 'react';
import { Layer, Feature } from 'react-mapbox-gl';


const PAINT   = {
  'line-width': 2,
  'line-opacity': 0.5,
  'line-dasharray': [2, 2]
};

const SPEED = 250;

const AnimatedLineLayer = ({ eventId, startX, startY, endX, endY, speed = SPEED, onAnimationEnd }) => {

  const [endCoordinates, setEndCoordinates] = useState([startX, startY]);
  const [isEnd, setEnd]                     = useState(false);

  useEffect(_ => {

    let x   = startX;
    let y   = startY;
    let sx  = (endX - x) / speed;
    let sy  = (endY - y) / speed;
    let i   = 0;

    const animateLine = _ => {
      setEndCoordinates([x += sx, y += sy]);

      if(++i === speed) {
        setEnd(true);
      } else
        requestAnimationFrame(animateLine);
    }

    requestAnimationFrame(animateLine);

  }, [startX, startY, endX, endY, speed]);

  /* To avoid to have onAnimationEnd dependency on the useEffect above. The isPlaying is a problem for the useCallback */
  useEffect(_ => {
    if(isEnd && onAnimationEnd)
      onAnimationEnd(eventId);
  }, [isEnd, eventId, onAnimationEnd]);

  return (
    <Layer
      type      = "line"
      paint     = {PAINT}
    >
      <Feature coordinates={[[startX, startY], endCoordinates]} />
    </Layer>
  )
}

export default AnimatedLineLayer;
