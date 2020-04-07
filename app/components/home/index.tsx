import React from 'react';
import { Link } from 'react-router-dom';

import routes from '../routes.json';
import Logo from '../logo';

export default function Home() {
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <div className="text-6xl flex flex-row items-baseline">
        <Logo />
        <h1>Caelirium</h1>
      </div>
      <Link to={routes.internal.COUNTER}>to Counter</Link>
      <Link to={routes.internal.TOPOLOGY}>to Topology</Link>
    </div>
  );
}
