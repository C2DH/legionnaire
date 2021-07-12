import React, { useState } from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';
import { CollectionRoute } from '../constants';
import { useGetMedias, useGetMediaFacets } from '../hooks';
import { getLabel as l } from '../utils';
import CollectionGrid from '../components/CollectionGrid';

import '../styles/pages/Collection.scss';

const TYPE_FACET_ALL = "all";

const Collection = () => {

  const [offset,    setOffset]    = useState(0);
  const [queryType, setQueryType] = useQueryParam('type', StringParam);

  const [{ mediaTypeFacets, count }] = useGetMediaFacets();
  const [{ medias, canLoadMore, nextOffset}] = useGetMedias(offset, queryType);

  function mediaTypeFacet_handleSelect(type) {
    setOffset(0);
    setQueryType(type !== TYPE_FACET_ALL ? type : undefined);
  }

  return (
    <Container className="Collection">

      <Row>
        <h1 className="my-5">{CollectionRoute.label.toUpperCase()}</h1>
      </Row>

      <Row>
        <Nav
          className         = "media-type-facet"
          defaultActiveKey  = {TYPE_FACET_ALL}
          activeKey         = {queryType}
          onSelect          = {mediaTypeFacet_handleSelect}
        >
          <Nav.Link eventKey={TYPE_FACET_ALL}>{l(TYPE_FACET_ALL)} ({count})</Nav.Link>
          {mediaTypeFacets && mediaTypeFacets.map(facet =>
            <Nav.Link eventKey={facet.data__type} key={facet.data__type}>
              {l(facet.data__type)} ({facet.count})
            </Nav.Link>
          )}
        </Nav>
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
