import React from 'react';
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

interface ContainerProps {
  data: any;
  groupBy: string;
}

const LsGroupCollectionDelivery: React.FC<ContainerProps> = ({data, groupBy}) => {

  const doReorder = (event: any) => {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();
  }

  return (
    <>
      <IonList lines="full">
        {data.group.map((groups: any, index: number) => (
          <IonItemGroup key={`group-${index}`}>
            <IonItemDivider sticky>
              <IonLabel>
                <IonText color={AppColor.PRIMARY}>
                  <h3 className="ion-text-uppercase">{`${groups[0][groupBy]} run`}</h3>
                </IonText>
              </IonLabel>
            </IonItemDivider>
            <IonReorderGroup disabled={false} onIonItemReorder={doReorder}>
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
    </>
  );
};

export default LsGroupCollectionDelivery;
