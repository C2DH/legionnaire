import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

import { useGetPerson, useGetEventsByPersonId } from '../hooks';
import { parseDate } from '../utils';
import EventMap from '../components/EventMap';
import EventCard from '../components/EventCard';
import MedalCard from '../components/MedalCard';
import { MediaRoute } from '../constants';
import {
  TYPE_IMAGE,
  TYPE_PDF,
  TYPE_LINK,
  MEDIA_VIGNETTE
} from '../constants';

import '../styles/pages/Person.scss';

const Person = () => {

  const { slug } = useParams();
  const [{ person, thumbnail, medals, militaryRanks, professions }] = useGetPerson(slug);
  const [{ events, eventsByType }] = useGetEventsByPersonId(person?.id);
  const { birth, residence, enrollment, depot, death } = eventsByType || {};

  return (
    <div className="Person">
      <div className="position-sticky">
        <Container>
          <Row>
            <Col>
              <h1 className="my-2">{person?.data?.title}</h1>
            </Col>
          </Row>
        </Container>
      </div>

      <Container className="mt-5">
        <Row>
          {thumbnail &&
            <Col lg={3} md={3} className="pe-4">
              <div className="media thumbnail mb-5">
                <Link to={`${MediaRoute.to}${thumbnail.slug}`}>
                  <img src={thumbnail.data.resolutions?.medium.url} alt={thumbnail.title} />
                </Link>
              </div>
            </Col>
          }

          <Col>
            <Row>
              <Col lg={8}>
                {birth && <EventCard type="birth" events={birth} />}
                {residence && <EventCard type="residence" events={residence} />}
                {enrollment && <EventCard type="enrollment" events={enrollment} />}
                {depot && <EventCard type="depot" events={depot} />}
                {death && <EventCard type="death" events={death} />}
              </Col>

              <Col lg>
                {medals?.length > 0 &&
                  <React.Fragment>
                    <h2>Parcours militaire</h2>
                    <div className="medals my-4">
                      {medals?.map(medal =>
                        <MedalCard key={medal.slug} medal={medal} />
                      )}
                    </div>
                  </React.Fragment>
                }

                {militaryRanks.length > 0 &&
                  <React.Fragment>
                    <h2>Grade militaire</h2>
                    {militaryRanks.map(rank =>
                      <div key={rank.name + rank.date}>
                        <span className="rank-name">{rank.name}</span>
                        {rank.date &&
                          <span> ({parseDate(rank.date)})</span>
                        }
                      </div>
                    )}
                  </React.Fragment>
                }

                {professions.length > 0 &&
                  <React.Fragment>
                    <h2 className="mt-1">Professions</h2>
                    {professions.map(profession =>
                      <div key={profession.name + profession.date}>
                        <span className="rank-name">{profession.name}</span>
                        {profession.date &&
                          <span> ({parseDate(profession.date)})</span>
                        }
                      </div>
                    )}
                  </React.Fragment>
                }

              </Col>
            </Row>
          </Col>
        </Row>
      </Container>

      <EventMap
        events          = {events}
        className       = "my-5"
        showLines       = {true}
        fitBoundsOnLoad = {true}
      />

      <Container>
        <Row>
          <Col md={6} className="mb-4">
            <h2 className="mb-3">BIOGRAPHY</h2>
            <ReactMarkdown linkTarget="_blank">
              {person?.data?.biography}
            </ReactMarkdown>
            <p className="mt-4">Si vous disposez de renseignements ou d’archives complémentaires concernant cette personne, merci de nous contacter à cette adresse : <a href={`mailto:c2dh.legionnaires@uni.lu?subject=Informations%20sur%20${person?.title}%20(${person?.slug})`}>c2dh.legionnaires@uni.lu</a></p>
          </Col>
          <Col md={6}>
            <ul>
              {person?.documents.map(doc =>
                doc.type === TYPE_LINK &&
                  <li key={doc.slug}>
                    <a
                      href    = {doc.data.url}
                      target  = "_blank"
                      rel     = "noreferrer"
                    >
                      {doc.title}
                    </a>
                  </li>
              )}
            </ul>

            {person?.documents.map(doc =>
              ((doc.type === TYPE_IMAGE || doc.type === TYPE_PDF) && doc.data.category !== MEDIA_VIGNETTE) &&
                <div className="media" key={doc.slug}>
                  <Link to={`${MediaRoute.to}${doc.slug}`}>
                    <img src={doc.data.resolutions?.medium.url} alt={doc.title} />
                  </Link>
                  {doc.title}
                </div>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Person;
