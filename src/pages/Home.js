import React, { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Particles from '../components/Particles';
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
          <h1>Légionnaires</h1>
          <div>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
            </p>
            <p>
              Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.
            </p>
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
