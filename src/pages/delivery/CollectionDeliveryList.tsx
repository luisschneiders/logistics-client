import React, { useEffect, useState } from 'react';
import {
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonGrid,
  IonRow,
  IonCol,
  IonFab,
  IonFabButton,
  IonIcon,
  IonFabList,
} from '@ionic/react';
import './CollectionDelivery.scss';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import LsTransition from '../../components/time/Transition';
import * as MOMENT  from '../../util/moment';
import { Period } from '../../models/Period';
import {
  endPeriod,
  startPeriod
} from '../../util/moment';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';
import { CompanyProfile } from '../../models/CompanyProfile';
import { AppColor } from '../../enum/AppColor';
import {
  add,
  downloadOutline,
  ellipsisVertical,
} from 'ionicons/icons';
import { setModalCollectionDeliveryShow } from '../../data/modal/modal.actions';
import LsComponentCollectionDelivery from '../../components/delivery/CollectionDelivery';
import LsModalCollectionDelivery from '../../components/modal/CollectionDelivery';
import {
  resetCollectionClientListActive,
  setCollectionClientListActive
} from '../../data/collectionClient/collectionClient.actions';
import {
  resetCollectionDeliveryList,
  setCollectionDeliveryList
} from '../../data/collectionDelivery/collectionDelivery.actions';
import * as ROUTES from '../../constants/Routes';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
}
interface DispatchProps {
  resetCollectionDeliveryList: typeof resetCollectionDeliveryList;
  resetCollectionClientListActive: typeof resetCollectionClientListActive;
  setCollectionClientListActive: typeof setCollectionClientListActive;
  setModalCollectionDeliveryShow: typeof setModalCollectionDeliveryShow;
  setCollectionDeliveryList: typeof setCollectionDeliveryList;
}
interface ContainerProps extends StateProps, DispatchProps {}

const CollectionDeliveryListPage: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
    resetCollectionDeliveryList,
    resetCollectionClientListActive,
    setCollectionClientListActive,
    setModalCollectionDeliveryShow,
    setCollectionDeliveryList,
}) => {
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentDayDD, 'day'),
    endDate: endPeriod(MOMENT.currentDayDD, 'day'),
  });

  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      resetCollectionDeliveryList();
      setCollectionDeliveryList(companyProfile.companyId, period);
    }
  },[
    isLoggedIn,
    companyProfile,
    period,
    resetCollectionDeliveryList,
    setModalCollectionDeliveryShow,
    setCollectionDeliveryList,
  ]);

  return (
    <IonPage className="collection-delivery-list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Delivery</IonTitle>}
          {width <= MOBILE_VIEW &&
          (isLoggedIn && companyProfile) &&
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton
                onClick={() => [
                  resetCollectionClientListActive(),
                  setModalCollectionDeliveryShow(true),
                  setCollectionClientListActive(companyProfile.companyId)
                ]}
              >
                <IonIcon
                  color={AppColor.SUCCESS}
                  icon={add}
                />
              </IonFabButton>
              <IonFabButton
                routerLink={ROUTES.TABS_PRINT_COLLECTION_DELIVERY_OVERVIEW}
              >
                <IonIcon
                  color={AppColor.PRIMARY}
                  icon={downloadOutline}
                />
              </IonFabButton>
            </IonFabList>
          </IonFab>}

          {width > MOBILE_VIEW && 
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol size="8" push="2" className="ion-no-padding">
                <LsTransition
                  dayOrMonthOrYear="day"
                  period={period}
                  setPeriod={setPeriod}
                />
              </IonCol>
              <IonCol size="1" push="2" className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton
                    size="small"
                    title="Print"
                    routerLink={ROUTES.TABS_PRINT_COLLECTION_DELIVERY_OVERVIEW}
                  >
                    <IonIcon
                      icon={downloadOutline}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
              <IonCol size="1" push="2" className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.TERTIARY} size="small" title="Add record">
                    <IonIcon
                      icon={add}
                      onClick={() => [
                        resetCollectionClientListActive(),
                        setModalCollectionDeliveryShow(true),
                        setCollectionClientListActive(companyProfile.companyId)
                      ]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
            </IonRow>
          </IonGrid>
          }
        </IonToolbar>
        {width <= MOBILE_VIEW && <IonToolbar>
          <LsTransition
            dayOrMonthOrYear="day"
            period={period}
            setPeriod={setPeriod}
          />
        </IonToolbar>}
      </IonHeader>
      <LsComponentCollectionDelivery />
      <LsModalCollectionDelivery />
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
    resetCollectionDeliveryList,
    resetCollectionClientListActive,
    setCollectionClientListActive,
    setModalCollectionDeliveryShow,
    setCollectionDeliveryList,
  }),
  component: React.memo(CollectionDeliveryListPage)
});
