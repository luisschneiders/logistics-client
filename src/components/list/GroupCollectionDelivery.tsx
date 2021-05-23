import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText,
  IonReorderGroup,
} from '@ionic/react';
import LsCollectionDelivery from './CollectionDelivery';
import { AppColor } from '../../enum/AppColor';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { immutableReorder } from '../../util/reorder';

interface ContainerProps {
  data: any;
  groupBy: string;
}

const LsGroupCollectionDelivery: React.FC<ContainerProps> = ({data, groupBy}) => {

  const [dataOrder, setDataOrder] = useState<any[]>([]);

  useEffect(() => {
    setDataOrder(data.group);
  },[
    data,
  ]);

  const doReorder = (event: any) => {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();

    // The parseInt(event.target.id) is the ID from <IonReorderGroup>
    const newDataOrder: any[] = immutableReorder(dataOrder[parseInt(event.target.id)], event.detail.from, event.detail.to);
    const newData: any[] = dataOrder;

    // Replace with new order
    newData[parseInt(event.target.id)] = newDataOrder;

    setDataOrder(newData);

  }

  return (
    <IonList lines="full">
      {dataOrder.map((groups: any, index: number) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider sticky>
            <IonLabel>
              <IonText color={AppColor.PRIMARY}>
                <h3 className="ion-text-uppercase">{`${groups[0][groupBy]} run`}</h3>
              </IonText>
            </IonLabel>
          </IonItemDivider>
          <IonReorderGroup disabled={false} onIonItemReorder={doReorder} id={index.toString()}>
            {groups.map((data: CollectionDelivery, itemIndex: number) => (
              <LsCollectionDelivery
                index={index}
                data={data}
                key={`group-${index}-${itemIndex}`} />
            ))}
          </IonReorderGroup>
        </IonItemGroup>
      ))}
    </IonList>
  );
};

export default React.memo(LsGroupCollectionDelivery);
