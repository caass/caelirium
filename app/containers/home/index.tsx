import React from 'react';
import { Link } from 'react-router-dom';

import { Cast } from 'react-feather';

import routes from '../../routes.json';
import Logo from '../../components/logo';
import LinkButton from '../../components/linkButton';

const Home: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <div className="text-6xl flex flex-row items-baseline mb-12 flex-wrap">
        <div className="mr-3 flex flex-row items-center">
          <Logo size={48} />
        </div>
        <h1 className="cursor-default select-none">Caelirium</h1>
      </div>
      <LinkButton>
        <Link to={routes.internal.TOPOLOGY}>
          <Cast size={36} />
          <span>Network Topology</span>
        </Link>
      </LinkButton>
    </div>
  );
};

export default Home;
