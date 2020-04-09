import React, { ReactNode } from 'react';
import { popoverWrapper } from './styles.scss';

type Props = {
  text: string;
  children: ReactNode;
};

const Popover: React.FunctionComponent<Props> = ({ text, children }: Props) => {
  return (
    <div className={popoverWrapper}>
      <span className="p-1 rounded transition-all px-2 duration-200 ease-in-out">
        {text}
      </span>
      {children}
    </div>
  );
};

export default Popover;
