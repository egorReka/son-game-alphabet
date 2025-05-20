import React from 'react';
import './Card.scss';

interface CardProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
}

const Card: React.FC<CardProps> = ({ children, onClick, className = '' }) => {
  return (
    <div className={`ui-card ${className}`} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;