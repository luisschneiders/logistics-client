import React, { useEffect, useState } from 'react';
import { connect } from '../../data/connect';
import { CollectionDeliveryGroup } from '../../models/CollectionDelivery';
import * as selectorsCollectionDelivery from '../../data/collectionDelivery/collectionDelivery.selectors';
import {
  IonContent, IonLoading,
} from '@ionic/react';
import { StatusColor } from '../../enum/StatusColor';
import LsGroupCollectionDelivery from '../list/GroupCollectionDelivery';
import LsCard from '../card/Card';

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

  const [hasRecord, setHasRecord] = useState<boolean>(false);

  useEffect(() => {
    if (delivery && delivery.group && delivery.group.length > 0) {
      setHasRecord(true);
    } else {
      setHasRecord(false);
    }
  }, [
    delivery,
  ])

  return (
    <>
      <IonLoading message="Fetching deliveries..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent>
        {delivery && delivery.group && delivery.group.length > 0 &&
          <LsGroupCollectionDelivery data={delivery} groupBy="deliverySchedule"></LsGroupCollectionDelivery>
        }
        {(!hasRecord && !isFetching) &&
          <LsCard color={StatusColor.WARNING} message="No records found!"></LsCard>
        }
      </IonContent>
    </>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    delivery: selectorsCollectionDelivery.getCollectionDeliveryByGroup(state),
    isFetching: selectorsCollectionDelivery.isFetchingCollectionDelivery(state),
  }),
  mapDispatchToProps: ({}),
  component: React.memo(LsCollectionDelivery)
});
