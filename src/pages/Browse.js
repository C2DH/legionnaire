import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { BrowseRoute } from '../constants';
import { useGetPeople } from '../hooks';
import PeopleGrid from '../components/PeopleGrid';

const Browse = () => {

  const [offset,    setOffset]    = useState(0);
  const [{ people, canLoadMore, nextOffset }] = useGetPeople(offset);

  return (
    <Container>
      <Row>
        <h1 className="my-5">{BrowseRoute.label.toUpperCase()}</h1>
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
