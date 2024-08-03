import InsertableCoin from '@/components/InsertableCoin';
import React, { useState } from 'react';

import styles from './index.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

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

      <InsertableCoin isReady={isHovered} />
    </button>
  );
};

export default Button;
