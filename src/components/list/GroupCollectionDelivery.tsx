import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonList,
  IonItemGroup,
  IonItemDivider,
  IonText,
  IonReorderGroup,
  IonButton,
  IonIcon,
} from '@ionic/react';
import LsCollectionDelivery from './CollectionDelivery';
import { AppColor } from '../../enum/AppColor';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { immutableReorder } from '../../util/reorder';
import { connect } from '../../data/connect';
import { printOutline } from 'ionicons/icons';
import * as ROUTES from '../../constants/Routes';
import { setPrintCollectionDelivery } from '../../data/print/print.actions';

interface StateProps {
}

interface DispatchProps {
  setPrintCollectionDelivery: typeof setPrintCollectionDelivery;
}

interface ComponentProps {
  data: any;
  groupBy: string;
}

interface ContainerProps extends ComponentProps, StateProps, DispatchProps {}

const LsGroupCollectionDelivery: React.FC<ContainerProps> = ({
  data,
  groupBy,
  setPrintCollectionDelivery
}) => {

  const [dataOrder, setDataOrder] = useState<any[]>([]);

  useEffect(() => {
    setDataOrder(data.group);
    setPrintCollectionDelivery(data.group);
  },[
    data,
    setPrintCollectionDelivery,
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
    setPrintCollectionDelivery(newData);

  }

  const handleReport = (index: number) => {
    const newData: any[] = dataOrder[index];
    setPrintCollectionDelivery(newData);
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
            <div slot="end">
              <IonButton
                fill="clear"
                shape="round"
                onClick={() => handleReport(index)}
                routerLink={ROUTES.TABS_PRINT_COLLECTION_DELIVERY}
                routerDirection="none"
              >
                <IonIcon
                  color={AppColor.SECONDARY}
                  slot="icon-only"
                  icon={printOutline}
                />
              </IonButton>
            </div>
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

export default connect<ComponentProps, StateProps, DispatchProps> ({
  mapStateToProps: () => ({}),
  mapDispatchToProps: ({
    setPrintCollectionDelivery,
  }),
  component: LsGroupCollectionDelivery
});
