import React, { useState } from 'react';
import { setDarkMode } from '../../data/user/user.actions'
import {
  RouteComponentProps,
  useLocation,
  withRouter
} from 'react-router'
import {
  IonMenuToggle,
  IonItem,
  IonIcon,
  IonLabel,
  IonMenu,
  IonContent,
  IonList,
  IonListHeader,
  IonToggle,
  IonPopover,
  IonBadge,
  IonButton,
  IonAvatar,

} from '@ionic/react';
import './Menu.scss'
import {
  businessOutline,
  moonOutline,
  sunnyOutline,
  warning,
} from 'ionicons/icons';
import { connect } from '../../data/connect';
import { appPages } from '../../app/AppPages';
import { AppColor } from '../../enum/AppColor';
import LsChip from '../chip/Chip';
import { CompanyProfile } from '../../models/CompanyProfile';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import { StatusColor } from '../../enum/StatusColor';
import { CompanyUser } from '../../models/CompanyUser';

interface StateProps {
  darkMode: boolean;
  isAuthenticated: boolean;
  menuEnabled: boolean;
  companyProfile: CompanyProfile;
  companyUser: CompanyUser;
}

interface DispatchProps {
  setDarkMode: typeof setDarkMode
}

interface ContainerProps extends RouteComponentProps, StateProps, DispatchProps {}

const LsMenu: React.FC<ContainerProps> = ({
    history,
    darkMode,
    isAuthenticated,
    menuEnabled,
    companyProfile,
    companyUser,
    setDarkMode,
  }) => {
  const location = useLocation();
  const [popoverState, setShowPopover] = useState({ showPopover: false, event: undefined });

  const renderMenuItems = (pages: any[], menu: string) => {
    return pages
      .filter(item => !!item.url && item.level === menu)
      .map((page, index, array) => {
        let level: any = null;
        if (index === 0) {
          level = page.level;
        } else {
          if (array[index]?.level !== array[index-1]?.level ) {
            level = page.level;
          }
        }

        return (
          <IonMenuToggle key={index} auto-hide="false">
            {level ? <IonListHeader>{page.level}</IonListHeader>: null}
            <IonItem detail={false} routerLink={page.url} routerDirection="none" className={location.pathname.startsWith(page.url) ? 'selected' : undefined}>
              <IonIcon slot="start" icon={page.icon} />
              <IonLabel>{page.label}</IonLabel>
            </IonItem>
          </IonMenuToggle>
        )
      });
  }

  return (
    <IonMenu type="overlay" disabled={!menuEnabled} contentId="main">
      <IonContent forceOverscroll={false}>
        {(!companyProfile || !companyProfile.companyId) &&
          <IonPopover
            cssClass='my-custom-class'
            event={popoverState.event}
            isOpen={popoverState.showPopover}
            onDidDismiss={() => setShowPopover({ showPopover: false, event: undefined })}
          >
            <IonList lines="full" className="ion-no-padding">
              <IonItem>
                <IonIcon slot="start" icon={warning} />
                <div>
                  No company associated to this user
                </div>
              </IonItem>
            </IonList>
          </IonPopover>
        }
        {(companyProfile && companyProfile.companyId) &&
          <IonList lines="full" className="ion-no-padding">
            <IonItem>
              
                <IonAvatar slot="start">
                  <img src="assets/img/avatar.svg" alt="User" />
                </IonAvatar>
                <IonLabel>{companyUser.userName}</IonLabel>
              
            </IonItem>
          </IonList>
        }
        <IonList lines="none">
          {(!companyProfile || !companyProfile.companyId) &&
            <IonItem>
              {/* TODO: create a proper notification centre */}
              <IonLabel>Notifications</IonLabel>
              <IonButton fill="clear">
                <IonBadge color={StatusColor.ERROR} slot="end" onClick={(e: any) => { e.persist(); setShowPopover({showPopover: true, event: e}) }}>1</IonBadge>
              </IonButton>
            </IonItem>}
          {isAuthenticated ? renderMenuItems(appPages().authenticated, 'Menu') : renderMenuItems(appPages().unauthenticated, 'Menu')}
        </IonList>
        <IonList lines="none">
          {isAuthenticated ? renderMenuItems(appPages().authenticated, 'Settings') : renderMenuItems(appPages().unauthenticated, 'Settings')}
        </IonList>
        <IonList lines="none">
          <IonListHeader>Appearance</IonListHeader>
          <IonItem>
            {!darkMode ? <IonIcon slot="start" icon={moonOutline}></IonIcon> : <IonIcon slot="start" icon={sunnyOutline}></IonIcon>}
            <IonLabel>Dark Mode</IonLabel>
            <IonToggle checked={darkMode} onClick={() => setDarkMode(!darkMode)} />
          </IonItem>
        </IonList>
        <IonList lines="none">
          <IonListHeader>Company</IonListHeader>
          <IonItem>
            <IonIcon slot="start" icon={businessOutline}></IonIcon>
            <IonLabel color={AppColor.TERTIARY}>Schneiders Tech</IonLabel>
            <span className="ion-text-uppercase company-division-title"><LsChip text="Logistics" color={AppColor.SUCCESS} /></span>
          </IonItem>
        </IonList>
        <IonList lines="none">
          {isAuthenticated ? renderMenuItems(appPages().authenticated, '') : renderMenuItems(appPages().unauthenticated, '')}
        </IonList>
      </IonContent>
    </IonMenu>
  );
}

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    darkMode: state.userReducer.darkMode,
    isAuthenticated: state.userReducer.isLoggedIn,
    menuEnabled: state.sessionsReducer.menuEnabled,
    companyProfile: selectorsSessions.getCompanyProfile(state),
    companyUser: selectorsSessions.getCompanyUser(state),
  }),
  mapDispatchToProps: ({
    setDarkMode
  }),
  component: withRouter(LsMenu)
});
