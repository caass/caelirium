import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../../routes.json';
import Logo from '../../components/logo';

const Home: React.FunctionComponent = () => {
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <div className="text-6xl flex flex-row items-baseline">
        <div className="mr-3">
          <Logo size={48} />
        </div>
        <h1 className="cursor-default select-none">Caelirium</h1>
      </div>
      <Link to={routes.internal.TOPOLOGY}>to Topology</Link>
    </div>
  );
};

export default Home;
