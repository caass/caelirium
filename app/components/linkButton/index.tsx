import React, { ReactNode } from 'react';
import { linkbtn } from './styles.scss';

type Props = {
  children: ReactNode;
};

const LinkButton: React.FunctionComponent<Props> = ({ children }: Props) => {
  return (
    <div className={`${linkbtn} text-3xl p-1 grid grid-cols-3 gap-4`}>
      {children}
    </div>
  );
};

export default LinkButton;
