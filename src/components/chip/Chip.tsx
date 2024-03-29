import { IonChip, IonLabel } from '@ionic/react';
import React from'react';

interface ContainerProps {
  color: string | undefined;
  text: string | undefined;
}

const LsChip: React.FC<ContainerProps> = ({color, text}) => {
  return (
    <IonChip color={color}>
      <IonLabel>{text}</IonLabel>
    </IonChip>
  );
}

export default LsChip;
