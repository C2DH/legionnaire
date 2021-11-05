import React  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { useGetMedia } from '../hooks';
import { getLabel as l } from '../utils';
import { PersonRoute } from '../constants.js';

import '../styles/pages/Media.scss';

const Media = () => {

  const { slug }    = useParams();
  const [{ media }] = useGetMedia(slug);

  return (
    <Container fluid className="Media">
      <Row className="h-100">
        <Col md={4} className="metadata mb-3">
            <h1>{media?.data.title}</h1>
            <div>
              <span className="label">Catégorie : </span>{l(media?.data.type)}
            </div>
            <div>
              <span className="label">Source : </span>{media?.data.source}
            </div>
            <div>
              <span className="label">Légionnaire : </span>
              <Link to={PersonRoute.to + media?.documents[0].slug}>
                {media?.documents[0].title}
              </Link>
            </div>
        </Col>

        <Col md={8} className="h-100">
          <div className="picture">
            <TransformWrapper wheel={{ step: 0.1 }}>
              {({ zoomIn, zoomOut, centerView }) => (
                <React.Fragment>
                  <div className="tools">
                    <button className="zoomIn" onClick={() => zoomIn()}>+</button>
                    <button className="zoomOut" onClick={() => zoomOut()}>-</button>
                  </div>

                  <TransformComponent>
                    <img src={media?.attachment} alt={media?.title} onLoad={_ => centerView()} />
                  </TransformComponent>
                </React.Fragment>
              )}
            </TransformWrapper>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default Media;
