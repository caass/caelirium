import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import { logo } from './styles.scss';

import routes from '../../routes.json';

const Logo: React.FunctionComponent = () => {
  return (
    <CloudSnow
      size={48}
      aria-label="Caelirium logo"
      role="button"
      tabIndex={0}
      className={`${logo} transition duration-500 ease-in-out`}
      onClick={() => shell.openExternal(routes.external.GITHUB)}
      onKeyDown={({ key }) => {
        if (key === 'Enter') {
          shell.openExternal(routes.external.GITHUB);
        }
      }}
    />
  );
};

export default Logo;
