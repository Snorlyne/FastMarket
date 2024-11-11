import React from 'react';
import { IonCard, IonCardHeader, IonCardTitle } from '@ionic/react';

interface CardProps {
  title: string;
  onClick: () => void;
  icon: React.ReactNode;
  className?: string;
}

export function Card({ title, onClick, icon, className = '' }: CardProps) {
  return (
    <IonCard
      className={`w-44 rounded-xl bg-gray-800 shadow-xl ${className}`}
      onClick={onClick}
    >
      <IonCardHeader>
        {icon}
        <IonCardTitle className="text-white">{title}</IonCardTitle>
      </IonCardHeader>
    </IonCard>
  );
}

export default Card;
