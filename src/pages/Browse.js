import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { useGetPeople } from '../hooks';
import PeopleGrid from '../components/PeopleGrid';

const Browse = () => {

  const [offset, setOffset]    = useState(0);
  const [{ people, canLoadMore, nextOffset }] = useGetPeople(offset);

  return (
    <Container>
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
