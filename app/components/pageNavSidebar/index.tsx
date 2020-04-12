import React from 'react';
import { ArrowRightCircle, ArrowLeftCircle } from 'react-feather';
import { useHistory } from 'react-router';
import BigIcon from '../bigIcon';

type Props = {
  direction: 'next' | 'prev';
  path: string;
};

const PageNavSidebar: React.FunctionComponent<Props> = ({
  direction,
  path
}: Props) => {
  const history = useHistory();

  return (
    <div
      className={`flex flex-col justify-center h-full ${
        direction === 'next' ? 'items-end' : 'items-start'
      }`}
    >
      <BigIcon
        icon={direction === 'next' ? <ArrowRightCircle /> : <ArrowLeftCircle />}
        onClick={() => history.push(path)}
        ariaLabel={
          direction === 'next' ? 'Go to next page' : 'Return to previous page'
        }
      />
    </div>
  );
};

export default PageNavSidebar;
