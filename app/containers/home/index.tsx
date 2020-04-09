/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import { shell } from 'electron';
import { CloudSnow } from 'react-feather';
import routes from '../../routes.json';
import PageHeader from '../../components/pageHeader';
import BigIcon from '../../components/bigIcon';

const Home: React.FunctionComponent = () => {
  return (
    <>
      <PageHeader
        title="Caelirium"
        icon={
          <BigIcon
            ariaLabel="Caelirium Logo"
            onClick={() => shell.openExternal(routes.external.GITHUB)}
            icon={<CloudSnow />}
          />
        }
      />
    </>
  );
};

export default Home;
