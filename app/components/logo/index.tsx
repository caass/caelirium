import React, { useState } from 'react';
import { shell } from 'electron';
import { logo } from './logo.scss';

import routes from '../routes.json';

export default function Logo() {
  const [hovered, setHovered] = useState(false);
  return (
    <i
      aria-label="Caelirium logo"
      role="button"
      tabIndex={0}
      className={`${logo} fas ${
        hovered ? 'fa-cloud-upload-alt' : 'fa-cloud-download-alt'
      } mr-3 transition duration-500 ease-in-out`}
      onClick={() => shell.openExternal(routes.external.GITHUB)}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          shell.openExternal(routes.external.GITHUB);
        }
      }}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      onMouseLeave={() => setHovered(false)}
      onMouseEnter={() => setHovered(true)}
    />
  );
}
