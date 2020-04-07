import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import { logo } from './logo.scss';

import routes from '../routes.json';

type Props = {
  size: number;
};

const Logo: React.FunctionComponent<Props> = ({ size }: Props) => {
  return (
    <CloudSnow
      size={size}
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
