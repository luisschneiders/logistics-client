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
import { 
  CollectionDelivery,
} from '../../models/CollectionDelivery';
import { immutableReorder } from '../../util/reorder';
import { connect } from '../../data/connect';
import * as ROUTES from '../../constants/Routes';
import {
  setPrintCollectionDeliveryOverview,
  setPrintCollectionDeliveryRun
} from '../../data/print/print.actions';
import { eyeOutline } from 'ionicons/icons';

interface StateProps {}

interface DispatchProps {
  setPrintCollectionDeliveryRun: typeof setPrintCollectionDeliveryRun;
  setPrintCollectionDeliveryOverview: typeof setPrintCollectionDeliveryOverview;
}

interface ComponentProps {
  data: any;
  groupBy: string;
}

interface ContainerProps extends ComponentProps, StateProps, DispatchProps {}

const LsGroupCollectionDelivery: React.FC<ContainerProps> = ({
  data,
  groupBy,
  setPrintCollectionDeliveryRun,
  setPrintCollectionDeliveryOverview,
}) => {

  const [dataOrder, setDataOrder] = useState<any[]>([]);

  useEffect(() => {
    setDataOrder(data.group);
    setPrintCollectionDeliveryRun(data.group);
    setPrintCollectionDeliveryOverview(data.group);
  },[
    data,
    setPrintCollectionDeliveryRun,
    setPrintCollectionDeliveryOverview,
  ]);

  const doReorder = (event: any) => {
    // Finish the reorder and position the item in the DOM based on
    // where the gesture ended. This method can also be called directly
    // by the reorder group
    event.detail.complete();

    /**
     * reorder the array and it replace with the new order
     */
    const newDataOrder: any[] = immutableReorder(dataOrder[parseInt(event.target.id)], event.detail.from, event.detail.to);
    let newData: any[] = dataOrder;
    newData = [...dataOrder];
    newData.filter((item, index) => {
      if (index === parseInt(event.target.id)) {
        newData[index] = [...newDataOrder];
        return item;
      }
      return item;
    });

    setPrintCollectionDeliveryRun(newData);
    setDataOrder(newData);

  }

  const handleReport = (index: number) => {
    const newData: any[] = [];

    newData.push(dataOrder[index]);

    setPrintCollectionDeliveryRun(newData);
  }

  return (
    <IonList lines="full">
      {data.group.map((groups: any, index: number) => (
        <IonItemGroup key={`group-${index}`}>
          <IonItemDivider sticky>
            <IonLabel>
              <IonText color={AppColor.PRIMARY}>
                <h3 className="ion-text-uppercase">{`${groups[0][groupBy]} run`}</h3>
              </IonText>
            </IonLabel>
            <div slot="end">
              <IonButton
                color={AppColor.SECONDARY}
                shape="round"
                onClick={() => handleReport(index)}
                routerLink={ROUTES.TABS_PRINT_COLLECTION_DELIVERY_RUN}
                routerDirection="none"
              >
                Preview
                <IonIcon slot="start" icon={eyeOutline} />
              </IonButton>
            </div>
          </IonItemDivider>
          <IonReorderGroup disabled={data.group[0].length <= 1} onIonItemReorder={doReorder} id={index.toString()}>
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
    setPrintCollectionDeliveryRun,
    setPrintCollectionDeliveryOverview,
  }),
  component: LsGroupCollectionDelivery
});
