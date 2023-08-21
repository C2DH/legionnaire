import React, { useState } from 'react';
import { Container, Row, Nav } from 'react-bootstrap';
import { useQueryParam, StringParam } from 'use-query-params';
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

  function mediaTypeFacet_handleSelect(category) {
    setOffset(0);
    setQueryType(category !== TYPE_FACET_ALL ? category : undefined);
  }

  return (
    <Container className="Collection">

      <Row className="position-sticky">
        <Nav
          className         = "media-type-facet"
          defaultActiveKey  = {TYPE_FACET_ALL}
          activeKey         = {queryType}
          onSelect          = {mediaTypeFacet_handleSelect}
        >
          <Nav.Link eventKey={TYPE_FACET_ALL}>{l(TYPE_FACET_ALL)} ({count})</Nav.Link>
          {mediaTypeFacets && mediaTypeFacets.map(facet =>
            <Nav.Link eventKey={facet.data__category} key={facet.data__category}>
              {l(facet.data__category)} ({facet.count})
            </Nav.Link>
          )}
        </Nav>
      </Row>

      <Row>
        {medias &&
          <CollectionGrid
            items       = {medias}
            canLoadMore = {canLoadMore}
            loadMore    = {() => setOffset(nextOffset)}
          />
        }
      </Row>
    </Container>
  )
}

export default Collection;
