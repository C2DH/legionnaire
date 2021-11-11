import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';

import { useGetStaticPage } from '../hooks';
import { TermsOfUseRoute } from '../constants';

const TermsOfUse = () => {

  const [{ page }]  = useGetStaticPage(TermsOfUseRoute.slug);

  return (
    <Container>
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

export default TermsOfUse
