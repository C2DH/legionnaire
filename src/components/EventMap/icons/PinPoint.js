import React from 'react';
import { ReactComponent as PinPointIcon } from './pinpoint.svg';

const PinPoint = ({ label }) => (

  <div className="PinPoint">
    <PinPointIcon />
    <span className="label">
      {label}
    </span>
  </div>

)

export default PinPoint;
