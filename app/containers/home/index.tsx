import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import Container from '../../components/container';

const Home: React.FunctionComponent = () => {
  return (
    <Container
      title="Caelirium"
      header={{
        icon: <CloudSnow />,
        onClick: () =>
          shell.openExternal('https://github.com/dfridkin/caelirium')
      }}
    />
  );
};

export default Home;
