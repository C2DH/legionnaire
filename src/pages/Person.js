import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { useGetPerson, useGetEventsByPersonId } from '../hooks';
import EventMap from '../components/EventMap';

import '../styles/pages/Person.scss';

const Person = () => {

  const { slug } = useParams();
  const [{ person }] = useGetPerson(slug);
  const [{ events, eventsByType }] = useGetEventsByPersonId(person?.id);

  return (
    <Container className="Person">
      <Row className="position-sticky">
        <Col>
          <h1 className="mb-5">{person?.data?.title}</h1>
        </Col>
      </Row>
      <Row>
        <Col lg={7}>
          {eventsByType?.birth &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE NAISSANCE</div>
                <div>{eventsByType.birth[0].data.date}</div>
              </Col>
              <Col>
                <div className="label">LIEU DE NAISSANCE</div>
                <div>
                  {eventsByType.birth[0].data.place.data.city} ({eventsByType.birth[0].data.place.data.country})
                </div>
              </Col>
            </Row>
          }
          {eventsByType?.residence &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE RÉSIDENCE</div>
                {eventsByType?.residence.map(residence =>
                  <div key={residence.slug}>{residence.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU DE RÉSIDENCE</div>
                {eventsByType?.residence.map(residence =>
                  <div key={residence.slug}>
                    {residence.data.place.data.city} ({residence.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
          {eventsByType?.enrollment &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE D'ENGAGEMENT</div>
                {eventsByType?.enrollment.map(enrollment =>
                  <div key={enrollment.slug}>{enrollment.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU D'ENGAGEMENT</div>
                {eventsByType?.enrollment.map(enrollment =>
                  <div key={enrollment.slug}>
                    {enrollment.data.place.data.city} ({enrollment.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
          {eventsByType?.depot &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DÉPOT</div>
                {eventsByType?.depot.map(depot =>
                  <div key={depot.slug}>{depot.data.date}</div>
                )}
              </Col>
              <Col>
                <div className="label">LIEU DÉPOT</div>
                {eventsByType?.depot.map(depot =>
                  <div key={depot.slug}>
                    {depot.data.place.data.city} ({depot.data.place.data.country})
                  </div>
                )}
              </Col>
            </Row>
          }
          {eventsByType?.death &&
            <Row>
              <Col sm={5}>
                <div className="label">DATE DE DÈCÈS</div>
                <div>{eventsByType.death[0].data.date}</div>
              </Col>
              <Col>
                <div className="label">LIEU DE DÈCÈS</div>
                <div>
                  {eventsByType.death[0].data.place.data.city} ({eventsByType.death[0].data.place.data.country})
                </div>
              </Col>
            </Row>
          }
        </Col>
        <Col lg>
        </Col>
      </Row>
      <Row className="mt-5">
        <EventMap events={events} />
      </Row>
    </Container>
  )
}

export default Person;
