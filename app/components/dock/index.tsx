import React, { ComponentType } from 'react';
import { useHistory } from 'react-router';
import { dock, active, inactive } from './styles.scss';

import BigIcon from '../bigIcon';

type Props = {
  icons: {
    path: string;
    icon: ComponentType;
    name: string;
  }[];
};

const Dock: React.FunctionComponent<Props> = ({ icons }: Props) => {
  const history = useHistory();

  return (
    <div
      className={`${dock} flex flex-row-reverse mb-2 justify-center mx-auto p-1 rounded-lg`}
    >
      {icons.map(({ path, icon: PageIcon, name }, i) => (
        <div
          key={name}
          className={`my-0 p-2 rounded-lg w-full ${i === 0 ? '' : 'mr-1'} ${
            i === icons.length - 1 ? '' : 'ml-1'
          } ${history.location.pathname === path ? active : inactive} `}
        >
          <BigIcon
            icon={<PageIcon />}
            onClick={() => history.push(path)}
            ariaLabel={name}
          />
        </div>
      ))}
    </div>
  );
};

export default Dock;
