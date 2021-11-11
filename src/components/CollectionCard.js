import React from 'react';
import { Link } from 'react-router-dom';
import { truncate } from 'lodash';
import { MediaRoute } from '../constants';

import '../styles/components/CollectionCard.scss';

const TRUNCATE_OPTIONS = {
  length: 90,
  separator: /[, ]/
}

const CollectionCard = ({ doc }) => (
  <Link className="CollectionCard" to={`${MediaRoute.to}${doc.slug}`}>
    <div className="picture">
      <div>
        <img src={doc.data.resolutions?.thumbnail.url} alt={doc.title} />
      </div>
    </div>
    <div>{truncate(doc.title, TRUNCATE_OPTIONS)}</div>
  </Link>
);

export default CollectionCard;
