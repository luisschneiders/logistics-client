import React from 'react';
import {
  IonLabel,
  IonItem,
  IonAvatar,
  IonIcon,
  IonButton,
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
    <IonItem>
      <IonAvatar slot="start">
        <IonIcon size="large" icon={businessOutline} color={AppColor.SECONDARY} />
      </IonAvatar>
      <IonLabel>
        <h2>{data.deliveryClientId}</h2>
        <p>Invoice: {data.deliveryInvoice}</p>
        <IonButton
          fill="clear"
          color={AppColor.TERTIARY}
          onClick={() => navigator.clipboard.writeText(data.deliveryInvoice)}
          className="ion-no-padding"
        >
          {`${data.deliveryInvoice} `}
          <IonIcon icon={copyOutline} color={AppColor.TERTIARY} />
        </IonButton>
      </IonLabel>
    </IonItem>
  );
};

export default React.memo(LsCollectionDeliveryList);
