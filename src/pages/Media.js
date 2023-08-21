import React  from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

import { useGetMedia } from '../hooks';
import { getLabel as l } from '../utils';
import { PersonRoute, MediaRoute } from '../constants.js';
import { ReactComponent as LeftIcon } from '../images/icons/left.svg';
import { ReactComponent as RightIcon } from '../images/icons/right.svg';

import '../styles/pages/Media.scss';


const Media = () => {

  const { slug }    = useParams();
  const [{
    media,
    people,
    relatedMedias
  }] = useGetMedia(slug);

  return (
    <Container fluid className="Media">
      <Row className="h-100">
        <Col md={4} className="metadata mb-3">
            <h1>
              {media?.data.title}
              {media?.data.index &&
                <span> (page {media?.data.index}/{relatedMedias.length + 1})</span>
              }
            </h1>
            <div>
              <span className="label">Type de média : </span>{l(media?.data.media_type)}
            </div>
            <div>
              <span className="label">Catégorie : </span>{l(media?.data.category)}
            </div>
            {media?.data.source &&
              <div>
                <span className="label">Source : </span>{media?.data.source}
              </div>
            }
            {people?.length > 0 &&
              <div>
                <span className="label">Légionnaire(s) : </span>
                {people.map(person =>
                  <Link key={person.slug} to={PersonRoute.to + person.slug}>
                    {person.title}
                  </Link>
                )}
              </div>
            }
            <div className="mt-4">
              {media?.data.description}
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

                  {media?.data.index && media.data.index > 1 &&
                    <Link to={MediaRoute.to + relatedMedias[media.data.index - 2].slug}>
                      <LeftIcon className="left-icon" />
                    </Link>
                  }
                  {media?.data.index && media.data.index <= relatedMedias.length &&
                    <Link to={MediaRoute.to + relatedMedias[media.data.index - 1].slug}>
                      <RightIcon className="right-icon" />
                    </Link>
                  }

                  <TransformComponent>
                    <img src={media?.attachment} alt={media?.title} onLoad={_ => centerView(1)} />
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
