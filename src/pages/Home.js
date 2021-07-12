import React, { useEffect } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import particles from '../utils/particles.js';
import '../styles/pages/Home.scss';

const Home = () => {

  useEffect(() => {
    particles('particles');
  }, []);

  return (
    <Container className="Home">
      <Row>
        <Col>
          <h1 className="my-5">LÉGIONNAIRE</h1>
        </Col>
      </Row>
      <Row>
        <Col className="animation" md={{ order: 'last' }}>
            <img src="/media/image/snapshots/90b96d0e3a05781fed01e9f754090f0c.jpg" />
            <div id="particles"></div>
        </Col>
        <Col md>
          <blockquote>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
          </blockquote>
        </Col>
      </Row>
    </Container>
  )
}

export default Home;
