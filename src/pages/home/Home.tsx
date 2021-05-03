import React, { useEffect, useState } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonMenuButton,
  IonList,
  IonLoading,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react';
import './Home.scss';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import LsTransition from '../../components/time/Transition';
import * as MOMENT  from '../../util/moment';
import { Period } from '../../models/Period';
import {
  endPeriod,
  startPeriod
} from '../../util/moment';
import LsMainChip from '../../components/chip/MainChip';
import { StatusColor } from '../../enum/StatusColor';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';

interface StateProps {
  isLoggedIn: boolean;
}
interface DispatchProps {

}
interface HomeProps extends StateProps, DispatchProps {}

const HomePage: React.FC<HomeProps> = ({
    isLoggedIn,
}) => {
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentDayDD, 'day'),
    endDate: endPeriod(MOMENT.currentDayDD, 'day'),
  });
  const [isError, setError] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  useEffect(() => {
    setIsLoaded(true);

    if (isLoggedIn) {
      // setAppSummary(userProfileServer.userId, parseInt(period.startDate));
      setError(false);
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
    } else {
      setError(true);
      setIsLoaded(false);
    }
  },[
    isLoggedIn,
    period,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Home</IonTitle>}
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
      <IonLoading message="Fetching data..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        {isError && <IonList className="ion-text-center">
          <LsMainChip text="Something went wrong! 😢" color={StatusColor.ERROR} />
        </IonList>}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: ({
  }),
  component: React.memo(HomePage)
});
