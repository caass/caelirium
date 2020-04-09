import React, { ReactNode } from 'react';
import { popoverWrapper } from './styles.scss';

type Props = {
  text: string;
  offset: number;
  children: ReactNode;
};

const Popover: React.FunctionComponent<Props> = ({
  text,
  offset,
  children
}: Props) => {
  return (
    <div className={popoverWrapper}>
      <span
        className="p-1 rounded cursor-default select-none transition-opacity px-2 duration-200 ease-in-out"
        style={{ top: `-${offset}%` }}
      >
        {text}
      </span>
      {children}
    </div>
  );
};

export default Popover;
