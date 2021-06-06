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
import './Print.scss';
import * as ROUTES from '../../constants/Routes';
import { dateFormatDDMMYY } from '../../util/moment';
import { connect } from '../../data/connect';
import * as selectorsPrint from '../../data/print/print.selectors';
import { CollectionDelivery } from '../../models/CollectionDelivery';
import { downloadOutline } from 'ionicons/icons';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

type Alignment = 'left' | 'right' | 'justify' | 'center';

interface StateProps {
  collectionDelivery: any[];
}

interface DispatchProps {
}

interface ContainerProps extends StateProps, DispatchProps {}

const PrintCollectionDeliveryRunPage: React.FC<ContainerProps> = ({
  collectionDelivery,
}) => {

  const alignmentCenter: Alignment = 'center';
  const alignmentLeft: Alignment = 'left';
  const alignmentRight: Alignment = 'right';

  const [driver, setDriver] = useState<string>('');
  const [title, setTitle] = useState<string>('Delivery Report');
  const [fileName, setFileName] = useState<string>('DeliveryReport');
  const [date, setDate] = useState<string>('');

  const [report, setReport] = useState<any[]>([]);

  /* eslint-disable  @typescript-eslint/no-unused-vars */
  const [tableHeaderColumns, setTableHeaderColumns] = useState<any[]>(
    [
      { text: '#', fillColor: '#eeeeee', bold: true},
      { text: 'Invoice', fillColor: '#eeeeee', bold: true},
      { text: 'Customer', fillColor: '#eeeeee', bold: true},
      { text: 'Receiver', fillColor: '#eeeeee', bold: true},
      { text: 'Location', fillColor: '#eeeeee', bold: true},
    ],
  );

  useEffect(() => {
    if (collectionDelivery && collectionDelivery.length) {
      setFileName(`${collectionDelivery[0][0].deliveryDate}_${collectionDelivery[0][0].deliverySchedule}DeliveryReport`);
      setTitle(`${collectionDelivery[0][0].deliverySchedule} run`);
      setDate(collectionDelivery[0][0].deliveryDate);

      const tableData: any[] = generateDataTable(collectionDelivery);
      const tableBody: any[] = generateReport(tableData, tableHeaderColumns);

      setReport(tableBody);
      
    } else {
      
      setReport(tableHeaderColumns);
    }
  }, [
    collectionDelivery,
    title,
    tableHeaderColumns,
    setTitle,
  ]);

  const generateDataTable = (data: any[]) => {

    const newCollectionDelivery: any[] = [];

    data.forEach((collectionDelivery: CollectionDelivery[]) => {
      collectionDelivery.forEach((item: CollectionDelivery, index: number) => {
        const newDataTableObj: any = {
          '#': (index + 1).toString(),
          'Invoice': item.deliveryInvoice,
          'Customer': item.deliveryClient?.clientName,
          'Receiver': item.deliveryReceiver,
          'Location': `${item.deliveryClient?.clientAddress.suburb}, ${item.deliveryClient?.clientAddress.state.toUpperCase()} ${item.deliveryClient?.clientAddress.postcode}`
        };
        newCollectionDelivery.push(newDataTableObj);
      })
    });

    return newCollectionDelivery;
  }

  const generateReport = (data: any[], columns: any[]) => {
    const body: any[] = [];

    body.push(columns);

    data.forEach((row: CollectionDelivery[]) => {
      const dataRow: any[] = [];

      columns.forEach((column: any) => {

        dataRow.push(row[column.text]);

      });

      body.push(dataRow);
    });

    return body;
  }

  const docDefinition = {
    content: [
      {text: `Delivery Report`, style: 'header'},
      {
        columns: [
          {text: `Driver: ${driver}`, style: 'columnLeft'},
          {text: `Date: ${dateFormatDDMMYY(date)}`, style: 'columnRight'},
        ]
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 1,
          widths: [ '100%' ],
          body: [
            [
              { text: title, fillColor: '#eeeeee', alignment: alignmentCenter, bold: true}
            ]
          ]
        }
      },
      {
        layout: 'lightHorizontalLines',
        table: {
          // headers are automatically repeated if the table spans over multiple pages
          // you can declare how many rows should be treated as headers
          headerRows: 2,
          widths: [ '5%', '20%', '25%', '20%', '30%' ],
          body: report
        }
      }
    ],
    styles: {
      header: {
        alignment: alignmentCenter,
        fontSize: 18,
      },
      columnLeft: {
        alignment: alignmentLeft,
      },
      columnRight: {
        alignment: alignmentRight,
      },
    },
    defaultStyle: {
      fontSize: 8,
    }
  };

  const handleDownload = (e: any) => {
    e.preventDefault();

    const defaultFileName: string = fileName;

    pdfMake.createPdf(docDefinition).download(defaultFileName);
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
              size="small"
              title="Download"
              onClick={handleDownload}
            >
              <IonIcon
                icon={downloadOutline}
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
          <h2 className="ion-text-center">Delivery Report</h2>
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
                      <th style={{width: '5%'}} className="ion-text-center">#</th>
                      <th style={{width: '20%'}}>Invoice</th>
                      <th style={{width: '30%'}}>Customer</th>
                      <th style={{width: '15%'}}>Receiver</th>
                      <th style={{width: '25%'}}>Location</th>
                    </tr>
                  </thead>
                  {(collectionDelivery && collectionDelivery.length > 0) &&
                    <tbody className="print__tbody">
                        {schedules.map((item: CollectionDelivery, index: number) => (
                        <tr key={index}>
                          <td style={{width: '5%'}} className="ion-text-center">{index + 1}</td>
                          <td style={{width: '20%'}}>{item.deliveryInvoice}</td>
                          <td style={{width: '30%'}}>{item.deliveryClient?.clientName}</td>
                          <td style={{width: '15%'}}>{item.deliveryReceiver}</td>
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
    collectionDelivery: selectorsPrint.printCollectionDeliveryRun(state),
  }),
  mapDispatchToProps: ({}),
  component: PrintCollectionDeliveryRunPage
});
