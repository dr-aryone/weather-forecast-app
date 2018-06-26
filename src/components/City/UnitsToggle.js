import React from 'react';
import classNames from 'classnames';

import './UnitsToggle.css';

export default ({ metric, imperial, onToggleHandler }) => {
  const metricClass = classNames({
    'UnitsToggle--active': metric,
  });
  const imperialClass = classNames({
    'UnitsToggle--active': imperial,
  });

  return (
    <div className="UnitsToggle">
      <span
        id="metric"
        className={metricClass}
        onClick={onToggleHandler}>
        &#8451;
      </span>
      <span></span>
      <span
        id="imperial"
        className={imperialClass}
        onClick={onToggleHandler}>
        &#8457;
      </span>
    </div>
  );
}
