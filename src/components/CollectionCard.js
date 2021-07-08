import React from 'react';

import '../styles/components/CollectionCard.scss';


const CollectionCard = ({ doc }) => (
  <div className="CollectionCard">
    <div className="picture">
      <img src={doc.data.resolutions?.thumbnail.url} alt={doc.title} />
    </div>
    <div>{ doc.title }</div>
  </div>
);

export default CollectionCard;
