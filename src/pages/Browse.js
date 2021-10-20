import React, { useState } from 'react';
import { useQueryParam, StringParam } from 'use-query-params';
import { Container, Row, Nav } from 'react-bootstrap';

import { useGetPeople } from '../hooks';
import PeopleGrid from '../components/PeopleGrid';
import { getLabel as l } from '../utils';

import '../styles/pages/Browse.scss';

const FILTER_ALL  = "all";
const ALPHABET    = Array.from(Array(26)).map((_, i) => String.fromCharCode(i + 97)).filter(letter => letter !== 'q' && letter !== 'x' && letter !== 'y');

const Browse = () => {

  const [startFilter, setStartFilter] = useQueryParam('start', StringParam);
  const [offset, setOffset]    = useState(0);
  const [{ people, canLoadMore, nextOffset }] = useGetPeople(offset, startFilter);


  function startFacet_handleSelect(filter) {
    setOffset(0);
    setStartFilter(filter !== FILTER_ALL ? filter : undefined);
  }


  return (
    <Container className="Browse">
      <Row className="position-sticky">
        <Nav
          className         = "start-facet"
          defaultActiveKey  = {FILTER_ALL}
          activeKey         = {startFilter}
          onSelect          = {startFacet_handleSelect}
        >
          <Nav.Link eventKey={FILTER_ALL}>{l(FILTER_ALL)}</Nav.Link>
          {ALPHABET.map(letter =>
            <Nav.Link eventKey={letter} key={letter}>
              {letter}
            </Nav.Link>
          )}
        </Nav>
      </Row>

      <Row>
        {people &&
          <PeopleGrid
            items       = {people}
            canLoadMore = {canLoadMore}
            loadMore    = {() => setOffset(nextOffset)}
          />
        }
      </Row>

    </Container>
  )
}

export default Browse;
