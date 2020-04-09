import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import routes from '../../routes.json';
import Container from '../../components/container';

const Home: React.FunctionComponent = () => {
  return (
    <Container
      title="Caelirium"
      header={{
        icon: <CloudSnow />,
        onClick: () => shell.openExternal(routes.external.GITHUB)
      }}
    />
  );
};

export default Home;
