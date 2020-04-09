import React, { ReactElement } from 'react';

type HeaderIcon = ReactElement;

type Props = {
  icon: HeaderIcon;
  title: string;
};

const PageHeader: React.FunctionComponent<Props> = ({ icon, title }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center content-center">
      <div className="text-6xl flex flex-row items-baseline mb-12 flex-wrap">
        <div className="mr-3 flex flex-row items-center">
          <h1>{icon}</h1>
        </div>
        <h1 className="cursor-default select-none">{title}</h1>
      </div>
    </div>
  );
};

export default PageHeader;
