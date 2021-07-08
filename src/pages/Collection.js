import React, { useState } from 'react';
import { Container, Row } from 'react-bootstrap';
import { CollectionRoute } from '../constants';
import { useGetMedias } from '../hooks';
import CollectionGrid from '../components/CollectionGrid';

const Collection = () => {

  const [offset, setOffset] = useState(0);
  const [{ medias, count, canLoadMore, nextOffset}] = useGetMedias(offset);

  return (
    <Container>
      <Row>
        <h1 className="my-5">{CollectionRoute.label.toUpperCase()} {count}</h1>
      </Row>
      <Row>
        {medias &&
          <CollectionGrid
            collection  = {medias}
            canLoadMore = {canLoadMore}
            loadMore    = {() => setOffset(nextOffset)}
          />
        }
      </Row>
    </Container>
  )
}

export default Collection;
