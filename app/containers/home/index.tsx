import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import Container, { ContainerProps } from '../../components/container';

const Home: React.FunctionComponent<ContainerProps> = ({
  next,
  prev
}: ContainerProps) => {
  return (
    <Container
      title="Caelirium"
      header={{
        icon: <CloudSnow />,
        onClick: () =>
          shell.openExternal('https://github.com/dfridkin/caelirium')
      }}
      next={next}
      prev={prev}
    />
  );
};

export default Home;
