import React, { useState, useEffect } from 'react';
import { Container, Row } from 'react-bootstrap';
import Particles from '../components/Particles';
import '../styles/pages/Home.scss';

const imagesSrc = {
  thumbnail: "/media/image/snapshots/84995bee11dbc90364c39285c9602d54-72-0-260-0.jpg",
  medium: "/media/image/snapshots/84995bee11dbc90364c39285c9602d54-96-768-0-0.jpg",
  preview: "/media/image/snapshots/84995bee11dbc90364c39285c9602d54.jpg",
  large: "/media/image/snapshots/84995bee11dbc90364c39285c9602d54-96-0-0-1200.jpg",
  original: "/media/image/84995bee11dbc90364c39285c9602d54.jpg"
};

const images = [
  "/images/intro-01.jpg",
  "/images/intro-02.jpg",
  "/images/intro-03.jpg",
  "/images/intro-04.jpg",
  "/images/intro-05.jpg"
];

const Home = () => {

  const [imgSrc, setImgSrc]   = useState(images[0]);
  const [size, setSize]       = useState(1);
  const [space, setSpace]     = useState(0);
  const [scale, setScale]     = useState(1);
  const [radius, setRadius]   = useState(64);
  const [opacity, setOpacity] = useState(1);
  const [shaker, setShaker]   = useState(true);
  const [hold, setHold]       = useState(false);

  const particles_changeHandler = (type, value) => {
    switch(type) {
    case 'src': setImgSrc(value); break;
    case 'size': setSize(value); break;
    case 'space': setSpace(value); break;
    case 'scale': setScale(value); break;
    case 'radius': setRadius(value); break;
    case 'opacity': setOpacity(value); break;
    case 'shaker': setShaker(value); break;
    case 'hold': setHold(value); break;
    default:
    }
  };

  useEffect(_ => {
    let i = 0;
    const intervalId = setInterval(_ => {
      setImgSrc(images[++i % images.length]);
      console.log(i);
    }, 6000);

    return _ => clearInterval(intervalId);
  }, []);

  return (
    <Container className="Home">
      <Row className="justify-content-center">
        <Particles
          src       = {images}
          size      = {size}
          space     = {space}
          scale     = {scale}
          radius    = {radius}
          opacity   = {opacity}
          shaker    = {shaker}
          hold      = {hold}
          imagesSrc = {imagesSrc}
          onChange  = {particles_changeHandler}
          withControls
        />
      </Row>
    </Container>
  )
}

export default Home;
