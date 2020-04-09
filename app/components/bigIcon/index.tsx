import React, { cloneElement, ReactElement } from 'react';
import { icon as bigIcon, hoverable } from './styles.scss';

type FeatherIcon = ReactElement;

type Props = {
  icon: FeatherIcon;
  ariaLabel: string;
  onClick?: () => void;
};

const BigIcon: React.FunctionComponent<Props> = ({
  icon,
  ariaLabel,
  onClick
}) =>
  cloneElement(icon, {
    size: 48,
    'aria-label': ariaLabel,
    role: onClick ? 'button' : 'icon',
    tabIndex: onClick ? 0 : undefined,
    className: `${`${bigIcon} ${
      onClick ? `${hoverable} transition duration-500 ease-in-out` : ''
    }`}`,
    onClick,
    onKeyDown: ({ key }: { key: string }) =>
      key === 'Enter' && onClick ? onClick() : undefined
  });

export default BigIcon;
