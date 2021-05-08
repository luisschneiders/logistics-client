import React, { useState, useRef } from 'react';
import {
  useIonViewWillEnter,
  IonPage,
  IonHeader,
  IonToolbar,
  IonButtons,
  IonButton,
  IonSlides,
  IonSlide,
  IonIcon
} from '@ionic/react';
import { RouteComponentProps } from 'react-router';
import './Welcome.scss';
import { setMenuEnabled } from '../../data/sessions/sessions.actions';
import { connect } from '../../data/connect';
import { arrowForward } from 'ionicons/icons';
import * as ROUTES from '../../constants/Routes';
import { setHasSeenWelcome } from '../../data/user/user.actions';
import { AppColor } from '../../enum/AppColor';

interface OwnProps extends RouteComponentProps {};

interface DispatchProps {
  setHasSeenWelcome: typeof setHasSeenWelcome;
  setMenuEnabled: typeof setMenuEnabled;
}

interface ContainerProps extends OwnProps, DispatchProps {};

const WelcomePage: React.FC<ContainerProps> = ({ history, setHasSeenWelcome, setMenuEnabled }) => {
  const [showSkip, setShowSkip] = useState(true);
  const slideRef = useRef<HTMLIonSlidesElement>(null);

  useIonViewWillEnter(() => {
    setMenuEnabled(false);
  });

  const startApp = async () => { 
    await setHasSeenWelcome(true);
    await setMenuEnabled(true);
    history.push(ROUTES.REGISTER, { direction: 'none' });
  };

  const handleSlideChangeStart = () => { 
    slideRef.current!.isEnd().then(isEnd => setShowSkip(!isEnd));
  };

  return (
    <IonPage id="welcome-page" className="welcome-page">
      <IonHeader no-border>
      <IonToolbar>
        <IonButtons slot="end">
          {showSkip && <IonButton color={AppColor.LIGHT} onClick={startApp}>Skip</IonButton>}
        </IonButtons>
      </IonToolbar>
    </IonHeader>
        <IonSlides className="welcome-page__slides" ref={slideRef} onIonSlideWillChange={handleSlideChangeStart} pager={true}>
          <IonSlide>
            <img src="assets/img/welcome.png" alt="Logo" className="slide-image" />
            <h2 className="slide-title">
              Welcome!
            </h2>
            <p>
              A simple and practical online transport management application
            </p>
          </IonSlide>
          <IonSlide>
            <img src="assets/img/welcome.png" alt="Logo" className="slide-image" />
            <h2 className="slide-title">Let's get started!</h2>
            <IonButton fill="clear" onClick={startApp} color={AppColor.LIGHT}>
              Continue
              <IonIcon slot="end" icon={arrowForward} />
            </IonButton>
          </IonSlide>
        </IonSlides>
    </IonPage>
  )
};

export default connect<OwnProps, {}, DispatchProps>({
  mapDispatchToProps: ({
    setHasSeenWelcome,
    setMenuEnabled
  }),
  component: WelcomePage
});
