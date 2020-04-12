import React, { ReactNode, ReactElement } from 'react';
import BigIcon from '../bigIcon';
import PageHeader from '../pageHeader';
import PageNavSidebar from '../pageNavSidebar';

type Props = {
  children?: ReactNode;
  title: string;
  header: {
    icon: ReactElement;
    onClick?: () => void;
  };
  next?: {
    path: string;
  };
  prev?: {
    path: string;
  };
};

export type ContainerProps = {
  next?: {
    path: string;
  };
  prev?: {
    path: string;
  };
};

const Container: React.FunctionComponent<Props> = ({
  children,
  title,
  header: { icon, onClick },
  next,
  prev
}: Props) => {
  const leftMargin = prev ? (
    <PageNavSidebar direction="prev" path={prev.path} />
  ) : (
    undefined
  );
  const rightMargin = next ? (
    <PageNavSidebar direction="next" path={next.path} />
  ) : (
    undefined
  );
  return (
    <div className="grid grid-flow-col grid-cols-9 h-full">
      <div className="col-span-1">{leftMargin}</div>
      <div className="col-span-7 overflow-hidden">
        <PageHeader
          title={title}
          icon={<BigIcon ariaLabel={title} onClick={onClick} icon={icon} />}
        />
        {children}
      </div>
      <div className="col-span-1">{rightMargin}</div>
    </div>
  );
};

export default Container;
