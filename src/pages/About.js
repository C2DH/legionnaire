import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { useGetStaticPage } from '../hooks';
import { AboutRoute } from '../constants';


const About = () => {

  const [{ page }]  = useGetStaticPage(AboutRoute.slug);

  return (
    <Container className="About">
      <Row className="justify-content-center">
        <Col xxl={9} xl={10}>
          <h1>{page?.data.title}</h1>
          <div>
            <ReactMarkdown linkTarget="_blank">
              {page?.data.abstract}
            </ReactMarkdown>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default About;
