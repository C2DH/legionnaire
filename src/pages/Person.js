import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPerson, useGetEventsByPersonId } from '../hooks';

import '../styles/pages/Person.scss';

const Person = () => {

  const { slug } = useParams();
  const [{ person }] = useGetPerson(slug);
  const [{ events, eventsByTypes }] = useGetEventsByPersonId(person?.id);
  console.log(events);
  console.log(eventsByTypes);

  return (
    <Container className="Person">
      <Row>
        <Col>
          <h1 className="my-5">{person?.data?.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={7}>
          {eventsByTypes?.birth &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE NAISSANCE</div>
                <div>{eventsByTypes.birth[0].data.date}</div>
              </Col>
              <Col>
                <div className="label">LIEU DE NAISSANCE</div>
                <div>
                  {eventsByTypes.birth[0].data.place.data.city} ({eventsByTypes.birth[0].data.place.data.country})
                </div>
              </Col>
            </Row>
          }
          {eventsByTypes?.death &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE DÈCÈS</div>
                <div>{eventsByTypes.death[0].data.date}</div>
              </Col>
              <Col>
                <div className="label">LIEU DE DÈCÈS</div>
                <div>
                  {eventsByTypes.death[0].data.place.data.city} ({eventsByTypes.death[0].data.place.data.country})
                </div>
              </Col>
            </Row>
          }
          {eventsByTypes?.residence &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE RÉSIDENCE</div>
                {eventsByTypes?.residence.map(residence =>
                  <div>{residence.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU DE RÉSIDENCE</div>
                {eventsByTypes?.residence.map(residence =>
                  <div>
                    {residence.data.place.data.city} ({residence.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
          {eventsByTypes?.enrollment &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE D'ENGAGEMENT</div>
                {eventsByTypes?.enrollment.map(enrollment =>
                  <div>{enrollment.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU D'ENGAGEMENT</div>
                {eventsByTypes?.enrollment.map(enrollment =>
                  <div>
                    {enrollment.data.place.data.city} ({enrollment.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
          {eventsByTypes?.depot &&
            <Row>
              <Col sm={5}>
                <div className="label">DÉPOT</div>
                {eventsByTypes?.depot.map(depot =>
                  <div>{depot.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU DÉPOT</div>
                {eventsByTypes?.depot.map(depot =>
                  <div>
                    {depot.data.place.data.city} ({depot.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
        </Col>
        <Col lg>
        </Col>
      </Row>
    </Container>
  )
}

export default Person;
