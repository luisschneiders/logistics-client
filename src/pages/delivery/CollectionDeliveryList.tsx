import React, { useEffect, useState } from 'react';
import {
  IonContent,
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
  ellipsisVertical,
  print
} from 'ionicons/icons';

interface StateProps {
  isLoggedIn: boolean;
  companyProfile: CompanyProfile;
}
interface DispatchProps {

}
interface ContainerProps extends StateProps, DispatchProps {}

const CollectionDeliveryListPage: React.FC<ContainerProps> = ({
    isLoggedIn,
    companyProfile,
}) => {
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentDayDD, 'day'),
    endDate: endPeriod(MOMENT.currentDayDD, 'day'),
  });

  useEffect(() => {
    if (isLoggedIn && companyProfile) {
      // setAppSummary(userProfileServer.userId, parseInt(period.startDate));
    }
  },[
    isLoggedIn,
    companyProfile,
    period,
  ]);

  return (
    <IonPage className="collection-delivery-list-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Transactions</IonTitle>}
          {width <= MOBILE_VIEW &&
          (isLoggedIn && companyProfile) &&
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton
                // onClick={() => [setModalCollectionDeliveryShow(true), setCollectionDeliveryListActive(companyProfile.companyId)]}
              >
                <IonIcon color={AppColor.SUCCESS} icon={add} />
              </IonFabButton>
              <IonFabButton
                // onClick={() => [setModalCollectionDeliveryShow(true), setCollectionDeliveryListActive(companyProfile.companyId)]}
              >
                <IonIcon
                  color={AppColor.DARK}
                  icon={print}
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
                  <IonFabButton color={AppColor.LIGHT} size="small" title="Search">
                    <IonIcon
                      icon={print}
                      // onClick={() => [setModalCollectionDeliveryShow(true), setCollectionDeliveryListActive(companyProfile.companyId)]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
              <IonCol size="1" push="2" className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
                    <IonIcon
                      icon={add}
                      // onClick={() => [setModalCollectionDeliveryShow(true), setCollectionDeliveryListActive(companyProfile.companyId)]}
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
      {/* <IonLoading message="Fetching deliveries..." duration={0} isOpen={isLoaded}></IonLoading> */}
      <IonContent>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    companyProfile: selectorsSessions.getCompanyProfile(state),
  }),
  mapDispatchToProps: ({
  }),
  component: React.memo(CollectionDeliveryListPage)
});
