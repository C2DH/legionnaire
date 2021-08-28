import React from 'react';
import { Link } from 'react-router-dom';
import { MediaRoute } from '../constants';

import '../styles/components/CollectionCard.scss';


const CollectionCard = ({ doc }) => (
  <Link className="CollectionCard" to={`${MediaRoute.to}${doc.slug}`}>
    <div className="picture">
      <div>
        <img src={doc.data.resolutions?.thumbnail.url} alt={doc.title} />
      </div>
    </div>
    <div>{ doc.title }</div>
  </Link>
);

export default CollectionCard;
