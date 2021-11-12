import React, { useEffect, useState, useRef } from 'react';

import { parseDate } from '../utils';
import { MEDAL_ICONS } from '../constants';

import '../styles/components/MedalCard.scss';


const MedalCard = ({ medal }) => {

  const icon            = useRef(null);
  const popup           = useRef(null);
  const [posX, setPosX] = useState(0);
  const [posY, setPosY] = useState(0);


  useEffect(() => {

    // Handler to call on window resize
    function handleResize() {
      //  Ensure that popup is visible
      const bodyRect = document.body.getBoundingClientRect();
      const iconRect = icon.current.getBoundingClientRect();

      setPosX(Math.max(Math.min(iconRect.left + 16 - popup.current.offsetWidth / 2, document.documentElement.clientWidth - popup.current.offsetWidth), 0));
      setPosY(iconRect.top - bodyRect.top + 40);
    }

    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    setTimeout(_ => handleResize(), 1000);
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);

  }, []);


  return (
    <div className="MedalCard">

      <img
        ref = {icon}
        src = {MEDAL_ICONS[medal.data.icon]}
        alt = {medal.title}
      />

      <div
        ref       = {popup}
        className = "popup"
        style     = {{ top: `${posY}px`, left: `${posX}px` }}
      >
        <h2>{medal.title}</h2>
        <div className="info">
          <div className="my-1">{medal.data.citation}</div>
          {medal.data.date &&
            <span>
              {parseDate(medal.data.date)}
              {(medal.data.city || medal.data.country) &&
                <span> - </span>
              }
            </span>
          }
          {medal.data.city}
          {medal.data.country &&
            <span> ({medal.data.country})</span>
          }
        </div>
      </div>
    </div>
  )
}

export default MedalCard;
