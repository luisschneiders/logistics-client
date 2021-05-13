import {
  logInOutline,
  starOutline,
  cogOutline,
  readerOutline,
  businessOutline,
} from 'ionicons/icons';
import { AppPage } from '../../models/AppPage';
import * as ROUTES from '../../constants/Routes'

export function appTabs() {
  const authenticated: AppPage[] = [
    { url: ROUTES.TABS_COLLECTION_CLIENT_VIEW, label: 'Client', icon: businessOutline },
    { url: ROUTES.TABS_COLLECTION_DELIVERY, label: 'Delivery', icon: readerOutline },
    { url: ROUTES.TABS_SETUP, label: 'Setup', icon: cogOutline },
  ];

  const unauthenticated: AppPage[] = [
    { url: ROUTES.LOGIN, label: 'Login', icon: logInOutline },
    { url: ROUTES.REGISTER, label: 'Register', icon: starOutline },
    { url: '/', label: '', icon: '' },
  ];

  const tabs: any = Object.assign({}, {
    authenticated,
    unauthenticated,
  });

  return tabs;
}
