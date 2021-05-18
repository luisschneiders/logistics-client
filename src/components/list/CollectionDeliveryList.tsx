import React from 'react';
import {
  IonLabel,
  IonItem,
  IonAvatar,
  IonIcon,
  IonButton,
  IonReorder,
} from '@ionic/react';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { businessOutline, copyOutline } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';

interface ContainerProps {
  data: CollectionDelivery;
  index: number;
}

const LsCollectionDeliveryList: React.FC<ContainerProps> = ({data, index}) => {
  return (
    <IonItem key={index}>
      <IonAvatar slot="start">
        <IonIcon size="large" icon={businessOutline} color={AppColor.SECONDARY} />
      </IonAvatar>
      <IonLabel>
        <h2>{data.deliveryClient.clientName}</h2>
        <p>Invoice: {data.deliveryInvoice}</p>
        <IonButton
          fill="clear"
          color={AppColor.TERTIARY}
          onClick={() => navigator.clipboard.writeText(data.deliveryClient.clientAddress.address)}
          className="ion-no-padding"
        >
          {`${data.deliveryClient.clientAddress.suburb}, ${data.deliveryClient.clientAddress.state} ${data.deliveryClient.clientAddress.postcode}`}
          <IonIcon icon={copyOutline} color={AppColor.TERTIARY} />
        </IonButton>
      </IonLabel>
      <IonReorder slot="end" />
    </IonItem>
  );
};

export default React.memo(LsCollectionDeliveryList);
