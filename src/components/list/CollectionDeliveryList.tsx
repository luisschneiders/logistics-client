import React from 'react';
import {
  IonLabel,
  IonItem,
  IonAvatar,
  IonIcon,
} from '@ionic/react';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { businessOutline } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';

interface ContainerProps {
  data: CollectionDelivery;
  index: number;
}

const LsCollectionDeliveryList: React.FC<ContainerProps> = ({data, index}) => {
  return (
    <IonItem>
      <IonAvatar slot="start">
        <IonIcon size="large" icon={businessOutline} color={AppColor.SECONDARY} />
      </IonAvatar>
      <IonLabel>
        <h2>{data.deliveryClientId}</h2>
        <h4>{data.deliveryInvoice}</h4>
      </IonLabel>
    </IonItem>
  );
};

export default React.memo(LsCollectionDeliveryList);
