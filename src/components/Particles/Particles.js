import React, { useEffect, useState, useRef } from 'react';
import ParticlesJS from '../../utils/particles.js';
import ParticlesControls from './ParticlesControls.js';

const Particles = ({
    src,
    size          = 1,
    space         = 0,
    scale         = 1,
    radius        = 64,
    opacity       = 1,
    margin        = 1000,
    pause         = 1,
    ease          = 5,
    reverseEase   = 5,
    shaker        = false,
    looping       = false,
    hold          = false,
    touching      = false,
    withControls  = false,
    onChange,
    imagesSrc,
    style
  }) => {


  const [count, setCount]         = useState(0);
  const [frameRate, setFrameRate] = useState(0);
  const particles                 = useRef(null);
  const particlesDelayId          = useRef(null);


  useEffect(() => {
    const createAnimation = () => {
      particles.current = new ParticlesJS('particles', {
        src, size, scale, space, radius, opacity, margin, pause, ease, reverseEase, shaker, looping, hold, touching,
        onLoad: setCount
      });
    }

     if(particles.current) {
       clearTimeout(particlesDelayId.current);
       particlesDelayId.current = setTimeout(() => createAnimation(), 1000);
     } else createAnimation();

    return () => particles.current?.destroy();
  }, [src, size, scale, space, radius, opacity, margin, pause, ease, reverseEase, shaker, looping, hold, touching]);


  useEffect(() => {
    const intervalId = setInterval(() => {
      setFrameRate(particles.current.frameCount || 60);
      particles.current.frameCount = 0;
    }, 1000);
    return () => clearInterval(intervalId);
  }, [])


  return (
    <React.Fragment>
      <div
        id        = "particles"
        className = "Particles"
        style     = {{ marginTop: `-${margin}px` }}
      ></div>
      {withControls &&
        <ParticlesControls
          src         = {src}
          size        = {size}
          space       = {space}
          scale       = {scale}
          radius      = {radius}
          opacity     = {opacity}
          margin      = {margin}
          pause       = {pause}
          ease        = {ease}
          reverseEase = {reverseEase}
          shaker      = {shaker}
          looping     = {looping}
          hold        = {hold}
          touching    = {touching}
          count       = {count}
          imagesSrc   = {imagesSrc}
          onChange    = {onChange}
          frameRate   = {frameRate}
        />
      }
    </React.Fragment>
  );
};

export default Particles;
