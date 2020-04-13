import React, { ReactElement } from 'react';
import styles, { btn } from './styles.scss';

type Props = {
  icon: ReactElement;
  text: string;
  onClick: () => void;
  buttonType?: 'success' | 'warning' | 'default';
  disabled?: boolean;
};

const Button: React.FunctionComponent<Props> = ({
  icon,
  text,
  onClick,
  buttonType,
  disabled
}: Props) => {
  return (
    <button
      className={`${btn} ${disabled ? 'cursor-not-allowed opacity-75' : ''} ${
        buttonType && !disabled ? styles[buttonType] : ''
      } transition-colors duration-300 ease-in-out rounded-lg p-2 flex flex-row justify-center align-baseline`}
      onClick={disabled ? undefined : onClick}
      type="button"
    >
      <h6 className="mr-1">{icon}</h6>
      <h6>{text}</h6>
    </button>
  );
};

export default Button;
