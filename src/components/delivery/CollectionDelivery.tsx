import React, { useEffect } from 'react';
import { connect } from '../../data/connect';
import { CollectionDeliveryGroup } from '../../models/CollectionDelivery';
import * as selectorsCollectionDelivery from '../../data/collectionDelivery/collectionDelivery.selectors';
import {
  IonContent, IonLoading,
} from '@ionic/react';
import LsGroupCollectionDelivery from '../list/GroupCollectionDelivery';

interface StateProps {
  delivery: CollectionDeliveryGroup | null;
  isFetching: boolean;
}

interface DispatchProps {}

interface ContainerProps extends StateProps, DispatchProps {}

const LsCollectionDelivery: React.FC<ContainerProps> = ({
  delivery,
  isFetching,
}) => {

  useEffect(() => {
  }, [
    delivery,
  ])

  return (
    <IonContent>
      <IonLoading message="Fetching deliveries..." duration={0} isOpen={isFetching}></IonLoading>
      {delivery && delivery.group && delivery.group.length > 0 &&
        <LsGroupCollectionDelivery data={delivery} groupBy="deliverySchedule"></LsGroupCollectionDelivery>
      }
    </IonContent>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    delivery: selectorsCollectionDelivery.getCollectionDeliveryByGroup(state),
    isFetching: selectorsCollectionDelivery.isFetchingCollectionDelivery(state),
  }),
  mapDispatchToProps: ({}),
  component: LsCollectionDelivery
});
