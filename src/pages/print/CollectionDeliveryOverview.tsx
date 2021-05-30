import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { useTitle } from '../../hooks/useTitle';
import './Print.scss';
import * as ROUTES from '../../constants/Routes';
import { dateFormatDDMMYY } from '../../util/moment';
import { connect } from '../../data/connect';
import * as selectorsPrint from '../../data/print/print.selectors';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { AppColor } from '../../enum/AppColor';
import { printOutline } from 'ionicons/icons';

interface StateProps {
  collectionDelivery: any[];
}

interface DispatchProps {
}

interface ContainerProps extends StateProps, DispatchProps {}

const PrintCollectionDeliveryOverviewPage: React.FC<ContainerProps> = ({
  collectionDelivery,
}) => {

  const [driver, setDriver] = useState<string>('');
  const [title, setTitle] = useState<string>('');

  useEffect(() => {
    if (collectionDelivery[0] && collectionDelivery[0].length) {
      setTitle(`${collectionDelivery[0][0].deliveryDate}_OverviewDeliveryReport`);
    } else {
      setTitle(`DeliveryReport`);
    }
  }, [
    collectionDelivery,
    title,
    setTitle,
  ]);
  
  useTitle(title, true);

  const handlePrint = (e: any) => {
    e.preventDefault();
    window.print();
  };

  return (
    <IonPage className="print__collection-delivery-page">
      <IonHeader className="noprint">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_COLLECTION_DELIVERY}></IonBackButton>
          </IonButtons>
          <IonTitle>Delivery report</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton
              color={AppColor.LIGHT}
              size="small"
              title="Print"
              onClick={handlePrint}
            >
              <IonIcon
                icon={printOutline}
                color={AppColor.SECONDARY}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {(collectionDelivery[0] && collectionDelivery[0].length) &&
          <IonItem className="noprint">
            <IonLabel>Enter driver name:</IonLabel>
            <IonInput
              name="driver"
              type="text"
              value={driver}
              spellCheck={false}
              autocapitalize="off"
              onIonChange={(e: any) => setDriver(e.detail.value!)}
              required
            />
          </IonItem>
        }
        <div className="print__collection-delivery-page-report">
          <h2 className="ion-text-center">Overview Delivery report</h2>
          {(collectionDelivery[0] && collectionDelivery[0].length) &&
          <div className="print__collection-delivery-page-header">
            <span>Driver: {driver}</span>
            <span>Date: {dateFormatDDMMYY(collectionDelivery[0][0]?.deliveryDate)}</span>
          </div>
          }
          {(collectionDelivery && collectionDelivery.length > 0) &&
            collectionDelivery.map((schedules: any[], indexSchedule: number) => (
              <div key={indexSchedule} className="ion-padding-vertical">
                <table className="print__table">
                  <thead className="print__thead">
                    <tr className="ion-text-center">
                      <th colSpan={5}>
                        {`${schedules[0].deliverySchedule} run`}
                      </th>
                    </tr>
                    <tr>
                      <th style={{width: '20%'}}>Invoice</th>
                      <th style={{width: '30%'}}>Customer</th>
                      <th style={{width: '20%'}}>Receiver</th>
                      <th style={{width: '25%'}}>Location</th>
                    </tr>
                  </thead>
                  {(collectionDelivery && collectionDelivery.length > 0) &&
                    <tbody className="print__tbody">
                        {schedules.map((item: CollectionDelivery, index: number) => (
                        <tr key={index}>
                          <td style={{width: '20%'}}>{item.deliveryInvoice}</td>
                          <td style={{width: '30%'}}>{item.deliveryClient?.clientName}</td>
                          <td style={{width: '20%'}}>{item.deliveryReceiver}</td>
                          <td style={{width: '25%'}}>{`${item.deliveryClient?.clientAddress.suburb}, ${item.deliveryClient?.clientAddress.state.toUpperCase()} ${item.deliveryClient?.clientAddress.postcode}`}
                          </td>
                        </tr>
                        ))}
                    </tbody>
                  }
                </table>
              </div>
            ))
          }
        </div>
      </IonContent>
    </IonPage>
  );

};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    collectionDelivery: selectorsPrint.printCollectionDeliveryOverview(state),
  }),
  mapDispatchToProps: ({}),
  component: PrintCollectionDeliveryOverviewPage
});
