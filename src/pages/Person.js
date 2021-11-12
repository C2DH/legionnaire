import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { useParams, Link } from 'react-router-dom';
import { useGetPerson, useGetEventsByPersonId } from '../hooks';
import EventMap from '../components/EventMap';
import EventCard from '../components/EventCard';
import MedalCard from '../components/MedalCard';
import { MediaRoute } from '../constants';
import {
  TYPE_IMAGE,
  TYPE_PDF,
  MEDIA_VIGNETTE
} from '../constants';

import '../styles/pages/Person.scss';

const Person = () => {

  const { slug } = useParams();
  const [{ person, thumbnail, medals }] = useGetPerson(slug);
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
                    <div className="medals mt-4">
                      {medals?.map(medal =>
                        <MedalCard key={medal.slug} medal={medal} />
                      )}
                    </div>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.

Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet. »
Lorem ipsum (version originale)
(En gras, le lipsum habituellement utilisé) extrait de : Cicéron 45 AC, De finibus bonorum et malorum, livre I, X, 32

« [32] Sed ut perspiciatis, unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam eaque ipsa, quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt, explicabo. Nemo enim ipsam voluptatem, quia voluptas sit, aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos, qui ratione voluptatem sequi nesciunt, neque porro quisquam est, qui dolorem ipsum, quia dolor sit, amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt, ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit, qui in ea voluptate velit esse, quam nihil molestiae consequatur, vel illum, qui dolorem eum fugiat, quo voluptas nulla pariatur? [33] At vero eos et accusamus et iusto odio dignissimos ducimus, qui blanditiis praesentium voluptatum deleniti atque corrupti, quos dolores et quas molestias excepturi sint, obcaecati cupiditate non provident, similique sunt in culpa, qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio, cumque nihil impedit, quo minus id, quod maxime placeat, facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet, ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat.

            <p className="mt-4">Si vous disposez de renseignements ou d’archives complémentaires concernant cette personne, merci de nous contacter à cette adresse : <a href="c2dh.legionnaires@uni.lu">c2dh.legionnaires@uni.lu</a></p>
          </Col>
          <Col md={6}>
            <ul>
              {person?.documents.map(doc =>
                doc.type === 'link' &&
                  <li key={doc.slug}>
                    <a
                      href    = {doc.data.url}
                      target  = "_blank"
                      rel     = "noreferrer"
                    >
                      {doc.data.source}
                    </a>
                  </li>
              )}
            </ul>

            {person?.documents.map(doc =>
              ((doc.type === TYPE_IMAGE || doc.type === TYPE_PDF) && doc.data.type !== MEDIA_VIGNETTE) &&
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
