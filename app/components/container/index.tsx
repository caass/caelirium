import React, { ReactNode, ReactElement } from 'react';
import BigIcon from '../bigIcon';
import PageHeader from '../pageHeader';

type Props = {
  children?: ReactNode;
  title: string;
  header: {
    icon: ReactElement;
    onClick?: () => void;
  };
};

const Container: React.FunctionComponent<Props> = ({
  children,
  title,
  header: { icon, onClick }
}: Props) => {
  return (
    <>
      <PageHeader
        title={title}
        icon={<BigIcon ariaLabel={title} onClick={onClick} icon={icon} />}
      />
      {children}
    </>
  );
};

export default Container;
