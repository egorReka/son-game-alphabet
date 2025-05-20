import React from 'react';
import './Icon.scss';

interface IconProps {
  name: string;
  size?: 'small' | 'medium' | 'large';
  color?: string;
  className?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  size = 'medium',
  color,
  className = '',
}) => {
  return (
    <span 
      className={`ui-icon ui-icon--${size} ${className}`}
      style={{ color }}
    >
      {name}
    </span>
  );
};

export default Icon;