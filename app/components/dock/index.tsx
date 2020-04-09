import React, { ComponentType } from 'react';
import { useHistory } from 'react-router';
import { dock, active, inactive } from './styles.scss';

import BigIcon from '../bigIcon';
import Popover from '../popover';

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
          // ml and mr are flipped because of row-reverse
          className={`${i === 0 ? '' : 'mr-1'} ${
            i === icons.length - 1 ? '' : 'ml-1'
          }`}
        >
          <div
            className={`m-0 p-2 rounded-lg w-full ${
              history.location.pathname === path ? active : inactive
            }`}
          >
            <Popover text={name} offset={100}>
              <BigIcon
                icon={<PageIcon />}
                onClick={() => history.push(path)}
                ariaLabel={name}
              />
            </Popover>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Dock;
