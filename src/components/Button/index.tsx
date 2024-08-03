import React, { useState } from 'react';

import InsertableCoin from '@/components/InsertableCoin';

import styles from './index.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

/**
 * Just a plain old button component
 *
 * @param {React.ReactNode} children
 * @param {function} onClick
 * @param {boolean} disabled
 */
const Button = ({ children, onClick, disabled }: ButtonProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <button
      onClick={onClick}
      className={styles.button}
      {...{ disabled }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {children}

      <InsertableCoin {...{ isHovered }} />
    </button>
  );
};

export default Button;
