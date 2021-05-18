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
import { copyOutline } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';
import * as ROUTES from '../../constants/Routes';

interface ContainerProps {
  data: CollectionDelivery;
  index: number;
}

const LsCollectionDelivery: React.FC<ContainerProps> = ({data, index}) => {
  return (
    <IonItem
      key={index}
    >
      <IonLabel>
        <IonItem
          lines="none"
          className="ion-no-padding"
          detail={true}
          routerLink={`${ROUTES.TABS_COLLECTION_DELIVERY}/${data.deliveryId}`}
        >
          <IonLabel>
            <h2>{data.deliveryClient.clientName}</h2>
            <p>Inv: {data.deliveryInvoice}</p>
          </IonLabel>
        </IonItem>
        <IonButton
          fill="clear"
          color={AppColor.PRIMARY}
          onClick={() => navigator.clipboard.writeText(data.deliveryClient.clientAddress.address)}
          className="ion-no-padding"
        >
          {`${data.deliveryClient.clientAddress.suburb}, ${data.deliveryClient.clientAddress.state.toUpperCase()} ${data.deliveryClient.clientAddress.postcode}`}
          <IonIcon icon={copyOutline} color={AppColor.PRIMARY} />
        </IonButton>
      </IonLabel>
      <IonReorder slot="start" />
    </IonItem>
  );
};

export default React.memo(LsCollectionDelivery);
