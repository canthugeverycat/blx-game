import React from 'react';

import styles from './index.module.scss';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
};

const Button = ({ children, onClick, disabled }: ButtonProps) => (
  <button onClick={onClick} className={styles.button} {...{ disabled }}>
    {children}
  </button>
);

export default Button;
