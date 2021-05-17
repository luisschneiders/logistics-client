import React from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText,
} from '@ionic/react';
import LsCollectionDeliveryList from './CollectionDeliveryList';
import { AppColor } from '../../enum/AppColor';
import { CollectionDelivery } from '../../models/CollectionDelivery';

interface ContainerProps {
  data: any;
  groupBy: string;
}

const LsGroupCollectionDelivery: React.FC<ContainerProps> = ({data, groupBy}) => {
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
            {groups.map((data: CollectionDelivery, itemIndex: number) => (
              <LsCollectionDeliveryList
                index={index}
                data={data}
                key={`group-${index}-${itemIndex}`} />
            ))}
          </IonItemGroup>
        ))}
      </IonList>
    </>
  );
};

export default LsGroupCollectionDelivery;
