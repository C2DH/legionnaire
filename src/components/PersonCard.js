import React from 'react';
import { Link } from 'react-router-dom';

import '../styles/components/PersonCard.scss';


const PersonCard = ({ person, imageHeight }) => {

//  const location = useLocation();

  return (
    <div className="PersonCard">
      <Link to={`/browse/person/${person.slug}`}>
      {/*
      <Link to={{
          pathname: `/browse/person/${person.slug}`,
          state:    { background: location }
        }}
      >
      */}
        {imageHeight &&
          <div className="thumbnail">
            <img
              src   = {person.illustration.data.resolutions?.thumbnail.url}
              alt   = {person.illustration.title}
              style = {{ height: imageHeight }}
            />
          </div>
        }
        <div>
          { person.title }
          {person.data.birth_year &&
            <span> ({person.data.birth_year})</span>
          }
        </div>
      </Link>
    </div>
  )};

export default PersonCard;
