import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import Particles from '../components/Particles';
import { useGetStaticPage } from '../hooks';
import { HomeRoute } from '../constants';

import '../styles/pages/Home.scss';


const images = [
  "/images/intro-01.jpg",
  "/images/intro-02.jpg",
  "/images/intro-03.jpg",
  "/images/intro-04.jpg",
  "/images/intro-05.jpg"
];


const Home = () => {

  const [size, setSize]               = useState(3);
  const [space, setSpace]             = useState(1);
  const [scale, setScale]             = useState(1);
  const [radius, setRadius]           = useState(64);
  const [opacity, setOpacity]         = useState(1);
  const [margin, setMargin]           = useState(1000);
  const [pause, setPause]             = useState(1);
  const [shaker, setShaker]           = useState(true);
  const [ease, setEase]               = useState(5);
  const [reverseEase, setReverseEase] = useState(4);
  const [looping, setLooping]         = useState(true);
  const [touching, setTouching]       = useState(false);
  const [hold, setHold]               = useState(false);

  const [{ page }]                    = useGetStaticPage(HomeRoute.slug);

  const particles_changeHandler = (type, value) => {
    switch(type) {
    case 'size': setSize(value); break;
    case 'space': setSpace(value); break;
    case 'scale': setScale(value); break;
    case 'radius': setRadius(value); break;
    case 'opacity': setOpacity(value); break;
    case 'margin': setMargin(value); break;
    case 'pause': setPause(value); break;
    case 'ease': setEase(value); break;
    case 'reverseEase': setReverseEase(value); break;
    case 'shaker': setShaker(value); break;
    case 'looping': setLooping(value); break;
    case 'touching': setTouching(value); break;
    case 'hold': setHold(value); break;
    default:
    }
  };

  return (
    <div className="Home">
    <Container>
      <Row className="justify-content-center">
        <Col md="6" className="intro pt-5">
          <h1>{page?.data.title}</h1>
          <div>
            <ReactMarkdown linkTarget="_blank">
              {page?.data.abstract}
            </ReactMarkdown>
          </div>
        </Col>
        <Col md="6" className="animation pt-5">
          <Particles
            src         = {images}
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
            onChange    = {particles_changeHandler}
            withControls
          />
        </Col>
      </Row>
    </Container>
  </div>
  )
}

export default Home;
