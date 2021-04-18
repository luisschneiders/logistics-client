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
import LsAppSummary from '../../components/summary/AppSummary';
import LsTransition from '../../components/time/Transition';
import * as MOMENT  from '../../util/moment';
import { Period } from '../../models/Period';
import { endPeriod, startPeriod } from '../../util/moment';
import { setAppSummary } from '../../data/summary/summary.actions';
import LsMainChip from '../../components/chip/MainChip';
import { StatusColor } from '../../enum/StatusColor';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';

interface StateProps {
  isLoggedIn: boolean;
}
interface DispatchProps {
  setAppSummary: typeof setAppSummary;
}
interface HomeProps extends StateProps, DispatchProps {}

const HomePage: React.FC<HomeProps> = ({
    isLoggedIn,
    setAppSummary,
}) => {
  const [height, width] = useWindowSize();
  const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentYearYYYY, 'year'),
    endDate: endPeriod(MOMENT.currentYearYYYY, 'year'),
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
    setAppSummary,
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
                monthOrYear="year"
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
            monthOrYear="year"
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
        {!isError && <LsAppSummary />}
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: ({
    setAppSummary,
  }),
  component: React.memo(HomePage)
});
