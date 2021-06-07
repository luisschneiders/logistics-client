import React from 'react';
import {
  IonLabel,
  IonItem,
  IonIcon,
  IonButton,
  IonReorder,
} from '@ionic/react';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { navigateOutline } from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';
import * as ROUTES from '../../constants/Routes';
import { timeFormatHHmm } from '../../util/moment';

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
            <p>Invoice: {data.deliveryInvoice}</p>
            <p>Time: {data.deliveryTime ? timeFormatHHmm(data.deliveryTime): '__:__'} | Receiver: {data.deliveryReceiver}</p>
          </IonLabel>
        </IonItem>
        <IonButton
          fill="clear"
          color={AppColor.PRIMARY}
          onClick={() => navigator.clipboard.writeText(data.deliveryClient.clientAddress.address)}
          className="ion-no-padding"
        >
          <IonIcon
            icon={navigateOutline}
            color={AppColor.PRIMARY}
          />
          {`${data.deliveryClient.clientAddress.suburb}, ${data.deliveryClient.clientAddress.state.toUpperCase()} ${data.deliveryClient.clientAddress.postcode}`}
        </IonButton>
      </IonLabel>
      <IonReorder slot="end" />
    </IonItem>
  );
};

export default LsCollectionDelivery;
