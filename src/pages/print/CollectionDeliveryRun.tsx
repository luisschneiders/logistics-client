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
import { dateFormatDDMMYY, timeFormatHHmm } from '../../util/moment';
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
      { text: 'Time', fillColor: '#eeeeee', bold: true},
    ],
  );

  useEffect(() => {
    if (collectionDelivery && collectionDelivery.length) {
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
          'Location': `${item.deliveryClient?.clientAddress.suburb}, ${item.deliveryClient?.clientAddress.state.toUpperCase()} ${item.deliveryClient?.clientAddress.postcode}`,
          'Time': item.deliveryTime ? timeFormatHHmm(item.deliveryTime) : ''
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
      { 
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARsAAADsCAIAAADLr5VjAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDpiYzBjMGViMi0yNzNmLWI1NDAtOWJkNC0wMGIzOGExOTdmNGEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6Q0UxMjJEMzBCODk3MTFFNEJDMzg4ODJGN0Y3Mjk0QTYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6Q0UxMjJEMkZCODk3MTFFNEJDMzg4ODJGN0Y3Mjk0QTYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTQgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NmRhYmUwY2ItYTYyYi1lMzQxLTk0YzgtNTk2MTE3NDIzM2Y2IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOmJjMGMwZWIyLTI3M2YtYjU0MC05YmQ0LTAwYjM4YTE5N2Y0YSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/PqCj4Z8AAEFQSURBVHja7F0FVBtZFyYzEw/SUhfqhXq37u7u7t32r1DflsrWu926u8vW3d3d3Z0KVGiBeGYm879JKCSTkMxMEgjwvsPhhJCRvLnfu/Luu1dAUZQPBASEmyCAjIKAgIyCgICMgoCAjIKAgICMSqsgSPLzZ0qtplQqHyMlkMkEUonA11cQ4C+QSODwQEZ5JUjS+PWbMfKr8ft3448o6vsPY3Q0FaukYmMppYoe0IAANCgHVqKYsFoVgZ+fx++HovBrN/QHjxA3bpEfPwJS2X/MEgnNqwB/JHNmNHcQmisXAn7ny4tmz+6DofCpQkYlzZRPkG/fk2/eku/fgxfGD+Hkp8+AToBUrA4XCsUtmsr+GopkzuSpG3zwSD12IvHkKf9TYCiaMwcaXBALCUaLFMIKhSA5ssMnDxnlpulerSYePQFiSj59Rrx4Sb5+C0jl4jmRwEDfNcuwP0q4/W71e/arRo1jS2/2AqFQoIWCseLFhKVKYmVKeW46gIxKpUbcu/fE7bv4nXvErTvk23c+HhgNgb9fwOmjSMYMbjyn4dwFZe/+Pkajp8cHyZpVWKYUBthVtjRWOMQHQSBnIKOYMH6JwK9exy9fBb+N374nwRUlvbrJJ4x14wljmrUhHj52TGNh5Yo+OE7FKCml0gjcvF+/KI3WJVlJFyCsXElUtZKwamUkW1ZInrTNKJLEb93Bz18Eszv54hVviwhYQUi2LEimTEDnAKkV+PkZP3/Rb99t/PnT0UyfM0e6S6fd+G2iq9cjP4Q7ulW5XNy8CVahnLBsaSRrlt9mrcb47RsdU/n6zfjhIxn+kXYOwe+ISK43gObJJaxWRVSvjrB8WR8Mg0RKK4yi9Hr80lXDiVOGk6epmFgu5g6C5gpCgwugwGXPncscHwOTdNxpVSr88jVATvzCJWPkV+fyF1wg4MQhN34v9ZgJum072Up/riCsXBkhYFeVSnb9IsA08uUr8sVL2nt8+px4/AS8w96mFdWpJWpQFyguGKNPvYwiCPzKNf2Bw4aTZ+jFGbbzbm6sZHGsZAmsRFFAJFv5IN+H46fPGE6dxe/cTSxObReyUcOlA/q603CN/BrdsDn1K5qzbsmfT1ilIjAIhRXLA5WbmD4nX78l7t0nHjzCr98EriYrSZJJgdYSt2ouqlndRyiEjEotVHr2XL9rr2H/YcdmWIKEFcwvrFAezN9YhbJI+vT2hNdIPHwEmAmIRL56zeOWsD9K+O3YLBCJ3PxN7z+I7fk/HqT6fVuosHQpYY1qolo1gAp1xN6ISMAr+ufiZTb2IdDk4maNxa1aYCWKQUalWOtOpdLvOwj8GTaLM2BuFlarLKpRDcypSJbMifpd128ajhw3nDpj/P6D942J6tdVzJku8PX1iG/47oN+2w5g0ALl6cp5kKxZRTWrierXEVaq4Fi9gAkLP3fRcPY8cfe+00gj0IfiNi3F7VrZn6ogo7xUKT15qv9vu/7AIaeBLCRjBlHd2k7kJp5Ix0+x1HL2hSlvHlHjBuLGDdGQgkkRdnn5GvAK/DgOALKZa0S1a4ga1KMTPuQyR4orKgoMERgoMFxOqCUUApUl6dEVK1YEMsqLQZKG02d1azfhN285d50b1hc3b0JHpRJfTiEePdHv3W84dNT4IyqlEMmehRZhOHnWcOKUc0F3PGhisbB2DXGzJsJa1R3bqzS1jp7Q794HnC4nZmapkpLuXcSN6qduLyvlMYrS6fQ792hXrTN++uxQulFRjaridq2FNR3JhPHrN9pc3LsfTPP8iRSUkyZS86bJRSSXdIhTrdWoPlAytGJ3uLwLnEzAK/3eA46NZCRTRmm/P8Xt2zrWgZBRScKl2Fjdxi3a9Zuon78cPbMc2SWd2gMLHjy8xI1FwnDitG77LvzKNd4ChwQGipo1ErdoipUo7rWDZqaWfv8h4vZdVzJCkKxZxG1bSdq3QbJnc2iFE4aTZ3SbttBMdhi9kPbtJenWWSCXQ0YlD5e06zbp1m6klMrEv4oAWP/gIQEn28FsCuwi3bZd+m07eccbBBKJqEFdcavmdFICmmISt4E2Nhw5pt+1j3j23AV5EQirVJS0bwvcUcfGG1BZus3b9Lv2UFpdoifz9ZX07i7t1S0pkvQho+K4pNXpVq/Trl7vgEvA6Be3biH5swdwYxI/EYVfvgbmTsPZ87yzS7EypSRtWoqaNEx0JSdFxHKePtPvOWDYfwioL/4qK0OgpEtHcZeO4IWjx/crWvffNt2G/xxcC/AK2IGAWqljgdiLGWU06vfs18xZQG+gSNx4AEpJ0r2zo/gsQegPHNauXMPbU6IXWFq3lHRq54ixKY9YhOHcRf2efYYz531wnOdJzHG8Xt2wIoUd8UqvBy6WdslKYCA48K9kwwcDvzelJ+N6KaPwS1fU/8win79I9AFkzAAepKRbFwcOLqXW6Lfv1K7Z6OBBOhGY8mXFndqLGtZz+/qsF1kBP3/pdu/Tb9nuOFHQyUBVKCcdGgp+O3youH7vAe2yVQ4uhBUKkU0c6+Q8kFHcNNOnz+oJU2nbLHGNIRvUHwi6AyOBio7Rrt0AbDxuuXwWZqSoZTNpj67eE7vzPLGAVXyVtopPn+MdwMBKlpANCwXeLHC3EteNJFCMmvmLHeRDiho3kI8fk+jiO2QUeztEu2qddtEySqdzZHD36OpIL7GJYThwD7JklnTtJAF0/Z0Um9ZAhn/Urduo37WXfbIsk1eFC0lHDBHVruGIvzodHbZduhI8L/vPWi4DRqCke9cUt2nfWxiF37ylHjuJfP0mMXtd0r0LUE0Cfz/eD8kx0NxB0n59xK1bpOUsz4TBVCrpiMK6TbwjosJyZWRjRwKt5egqYPpbsgLMgIntlcaKFZHPnAYoChnF5eGpVOpJ/wDPNbEPAN9XNmq4o/oHFKXfd1AzewE/f4meUwf0ETVqADeo2k5SdERh+Wrj5y/8zgBcUPDs0Dy5HWnFd+8102bQARL7jweV/u9P2dDQlDLTJTOj8KvXVSPGJMYErHhR+cRxWOk/HJmK9x6oJ01zmgJjXy/lzycD9kmDuo7sfgiC1O3crV28gmeAB0WlvbpJh4Y6XszFL15WT5yW2M4RrFCIYv6sFOHWJhujKK1OM3OObsN/9m8rfTr5mJG0DeZgrfbnT80/s/R79vN5yrmCpIMHiFs2g3qJ9eSH6zZv0y5fxc8ORDJnko8fI2rS0JFIGAy6FWuAHQhe2LX86W1mf/bw8ukveRgFFItqeFhiExIQdDD6gFQOzDzd9l2aGXN4hPIEvr6yIQMkPbrCvdx85kG1RrtitW71+sSiR06cqyqV5FPGO17WI9+Hq8dPwi9dtX+GalUU82cigYGQUfGaxahduUYzZ6HdxAUkezbF9MnC6lUdjfjzF6qxE+n9OdzND0mHttIRg9PUdh2PPMPIr5rZ8/lZBwKRSDpymLR3d8fWAfDf1JOn2w3YIhkCFUvme+2aVZIyyhgVpRo6MrHpR9K9s2zUCEeRcY1Wu2Cxdu1GHmlEWKmSiulT0tD6UhIYGnfuqcZNcrAK7+hxlC2tmPMvsL0dScv3H+qxEw2nztidHGWAlv/r7YUWYNIxClh6yv6D7a7rIZkyKmZPd6ya8Ju31X+NIcM/cv6GcrksbLikS0foMnkkaLFxs2beYkqt5vxcZFLZmJH0c3HICv2+g+rxU+wWCxE1rKeYOxOcJy0ySrdpi3rKv3aXHUQN6ir+nepgRZXS6zUz5+nWb+Kxli+qU1M+dWJ8eS0Ij5geXyJUYeMSMz2cPKBaNYCycuQzmxadVYP/Iu4/sKOrQoL91i53ssEktTEKx1Xjp+i377JzbalEPnk8nRzpYDRfvlaGDuWR5AqmLvrkbVtBiU+SkIUpVjRtJg9lhWTJ7Lt4HrADHStDzbyF2hVrbDezAa/Yd/VSx0ssqYdRxp8/Vf0GA4PNzuySN4/v8kWOq/AAHqon/cMjrISVKKZYOBfNHQRFPYmVlXLwCHprI+cHhsrHhkl6dXMyOV+6qhw0jIqOYQqxRKKYN1PUqH4qZxT57r2yR1+7icaiJg0VM6c5WPIDLAJeqX7vAR7XlQ7oKxs+GAbHkwckqVm4VLtkBY+d0eIWTeVAKsRiR6T99FnZbxDx2KbilUAg/ztM0rtHqmUUcetObJ8BttMJPRv9PUbSo4uTqa7vQDujxiIIoVgwW1S3FhTs5AV+85Zq4DAea8FYyRLAhHPcdYGebcdNshu7l4b2k/01NBUyynD6nCp0mK21JvD3A5YeXQPE0cO4reo/hMf2UjRPLt/Vy9D8+aBAe4UF+O278n+hxL0HnN2qrFn9Nq5GC+Z3/DHtyrWaGXNsg1WSzh3k0yYmY1Td/YzS795H9zWyUfponty+a5c7Xi83HD6qHBbGY0upsEY130VzUlO5glShqnD1xKm6rTs5C6Wvr+/aZcJyZZ1M3MdPqYaOtJ24xS2bKeb8m1wlQNzMKN1/29R/T7Yj8ZUqAO3kYC8GPeusWEPPOtwh6dRePnVCCiqikqag27xVPXEaZ7dKKPRdttCpAU/cf6DsPcDWohE3b6KYNzNZRMKdjNKt3aCeOsOOxwnmjNnTHYUKKEo99V/duk08LiobPlg6eAAUXG9GYl6AM/sPAawQt2jqJBTyPjy2ay/jx09eQiq3MUq3biO9hmurQHp2pZuRObBrSVI9Yapuy3YeF5VP+ttxkAPCS0A8fKzs0Zdz4Wt2pDJGRMZ26UW+eWvHePlnUhL7VO5hVGLGnmzYIOmQgQ5nGFI1PEx/4DAfOk2bSOewQKQUUj19Ftu6o4PyfYmSauY0pyv1gKvKzr1sSxHSE/rEcSmMUXQo4q8xdiR+ynhJt86OjqQo4FlCOqUh8+/YSWX/wZwPY6epKKUSaCrbvadub97lGOikSZNcGqMz51VD/rINYtIS37WTYzoBtabftZeP7zQuTNqzKxTQFAe0QD7w3Ikbt7gdRlGG02exQoXQfI4CxXQFq/p18PMXqSgr2xK/cg3NltVxRUFv0VHE7btgVrD1ONkoEPW0mbo163lcVNq/ryxsOJTOlAqKUvYZQNcw4yqpIpHflvVO0v9M5l9sqw7Mhloo6rdhlbBqZa9mFBn+MaZFO9ui/sBslThTIImFMZyCDuAsmA3LQqRsTqlUMU3bsGxGaiWs/n7+e7Y5XcQ3RkTGtOnEqDYjUCj8921HC+T3UkZRMbExLduTb98x7TEWsWzD8VPKAUN45H2B+cl/6wZY/SsVgHz1OqZ5W6dN9Oy4VNmz+R/c5XRXPH3+Vh0ZW4DpYw/t9vQObl6b8EiS3mFhQydJt85O6UQ8eKgaOpIHnZBsWX2XL4J0Si0OVX5+ITigeZT/G2Q3q4Y2l363Gwfn912xiLEECo5VDRjKqSV5EkUmNDPn6vceZLxJN5yd/Y/jfbLGH1GxnXtS0dybMQuFfpvXOi77BpGygBUtDDQJj2bhxi8Rxsivonq1rd78+OlXherErTuixg0FQppIaFBONFtWw0mrTfXGT5+pmBi6m7336CjD0RPalWuZo1OsCO3eOF6fJkhV6DA2zcZtIR8/GiteFEphKoNi+hQkcyYeB+p37WWkBCA5c4ga1sOv3VB27xNv7InbtJT26cn04Tdu0e876C1+FJgJohu2YGz6B4Pif2hPfENB8vUb3aatwKESBPhbfox3cA+MFG3vQaRGGE6coq04HhAK/Xdvsewuafz+I7pWQ0AnrEwpv83rBFKJeR6P7dSdsedVIJP6H9ztoW0KXHQUjitDhzFraAiFvisXx9NJt24joJxu0xbyvVUkB794mR+dAF3BTAYlL7UCOAs8g9o4rho6yrJWJpIxg/zvMB/Too7yf6FxvhaGKpbMZ7SNozRaZf8hPOIibmaUZv5i2wVp+eS/46vFA/+KjonjuKR7Z8sS8vTe+BGj+d2ffNrENNsmI41APi6M33II+e69dtkqy3foRuYVy5tncHpbkMn+oittLZnP8PCB/6aZ+m9yMoq4e5+um2ENcfMmkk7tza+1y1dpl6/2MTW5kI0eaWXvhY3nV9oX0FJUtzaUudQNNKQg76esXbrSKuYsEMinTzYHhA2Hj2oWLIkzpCqUo4v7MRyqbTsNx04mD6MonU41fBQj5A2YQ9+92Ro+c14za37clPPv1DgT1uxEHjpiv4ghC0iHwG0aaQKSP3vwPBLH1WMnWibBoXlyS/+Mi0ZoFy4F4hcnS8MG2e4LVo3+20FjOA8yCtyZbVqHYsFsc+kV8C/VsFHmbyVu3cKsduOoGBOrmTyd59QVXEBUoxqUtrQAYbkyvJdG8Os3GTUnpKH94kOI6rC/zaXpBCIRHY627u8G5JPeDZnEjCKfv9CuXsfUHqH9zJ4SpdYo+w4wN0ETBPjTNrGlvTd9lvEHz4bkks4dYLZRWgpR1OF9rPqfmZY9Jej+iCOGJAQhBg41ByHoRmED+zGONZw4ZTh1NgkZRVGqcZMYy8xAe8gG9Y/77/Cw+PKUsmGDLYuDEg8f63fu4XdbYEZxmr0PkarUVOVKvI+lfkVr5i208vDbtIwvBUm+eq2eEmcoSQf0tW3tp54wlfOuLd6M0h86Sty5Z30EopgVt8Vdv/8QoHgczfLlpbWKBTTTZvLvkVyxPCzDkqaAFSviyuG6/7aTL15ZSmm8mvIxlVI1nLvgY9rxIZ84lnGsMSKC39IOZ0ZROp1m+ixbYwwrUcysTy0LrcjGjbI0Ug2nzuA3b/G+LehBpTUAl8FxE0RnzgkJbD8rEapXx3IJRz16vDmXQlS3Nt3NnhEpWLnWdheF+xmlW7+ZEQlB0qePrzCoXbLc+PVb3ARTsoSoVg0L1hs1M+cl44wFkUJJ5crh+MXLxK07lu/IhoUmiOTXb5rZC8yv5eNHMzLmKJVKs2S5ZxlF9/FeyVyAkv411FwhjAz/qFuzIeHWRw2z8vZOnUm06zs7OC2ACAFhC82cBVa+WbUqWKEQC8twG/HoiY8pM93WS9dv2eEWNZUoo7TrNjFqLKN580h+99HQzJoXnwCClf6DUSZWu8hVukMnKg2CilW6eAb8xi3iwUMLMRJI+vexNJ0SQhSDBjDVlF6vXb/JU4yi1BqdzdnpvegmT4l48tRw+FiC4upvVRYDv3QFfMClm4K1LNMgnaJj7PYI5RyisO6VLm7UAMmaNf5PYBaaY+Vo7iBbNaXbtAVIvkcYpdu6g9E0GitcCLh6cQrKwkdC8+cT1a5hfVtbXR0VknRjNBMiRcBKt7gA/aGjVkugGCrpYh2CnjnXnP0jHfg/JqtjYvlV5nLGKILUrdvI9KCGDDCvtwLFClzA+PfpApQW67DGyK+Gs+ddHxfy5SsoZGkKbhEbk/QShgOHrNRUhzaWW7+Bh68/cszsxQirMBfB9Nt2uJ9RhjNnGfsC0Ty54nMZtfMStioJ5DJxy2ZWCmr7Lh5tp+0YxJevQiFLOwDTtG7zNnedTW+d/4oEBorq1LSS0mWrzSulkm7MAnjEoyfE02duZpSt2Sbp2c2cDE/cuYdbFFsTN2/CWEMw8OqhZmdQdu/lUYsCIiXC+OmzKnSYGx83cfc+w2cRt7EqSUs8e262s0S1atr2aLat+OASo8DXw69cs3wHcCb+hrTLrbejtLVqoUs+f8Gjl7t9q+/dh/hUfIhUDPLd+9hOPfht9kmco0bcunOpqHpVRgkk7frNcV5W+zZMG+3IcR8XilgyGaXff4jxjrhFU3ODe/LVa8vChWhQTuyPElbHgltxH7SLluk2b4Uyl5p9p1NnY5q3c9csbG28Pbb6G0NFDepa2ZkXLpm3U4iaNmLyMSKCuP/QfYyyacYY38udUbBF1LwJc4BOnnbvuKjHT9HMmucWxwzCuyy9iAhl6HBln7hdC+5Xfa+ZfTpEjRtY/U1R+p27fUz5qLZlMQ3HTriHUeSLV4xKn2jePHFZfNExhoNHrG7RmvTGnz+tUhXdpamWrYpp39W2kQlEigRFEfceqEaM/lW1ruHwUefSmTkTv7V+wFjGO8LyZRk+P9033eS8MSSZZtTFK+5hlO1mW1GThr8vv9+qSkaWzFjhQlZ69votDz0F4vbd6PpN1WMn2tbchEgpsQfgnACL41flWjEt29N2EEE4PkTcvEnAmaPpblxMf++afMIYxw3k7TD3l01NSAwTVq5odVeRX/HrN+lrMdSXKSLAudVV/HUYdi2TUb/py+imSufFWm8HNN+cp0CQuq07wI+wamVx00bCOjU9XWsXgoP46nRUTCz4MUZH0y9iY43ffwAtYfwSafwSAdwkDskQCAKcc9nwwQnSj6KSXt1FDeupx01mv2ZF6fW2bwqrVWY4JobDx4SVKqAhwUjGDIzoCH7lmrhpY5cYBew6hj8Xr4jwm7cZma+2S2M8OC2QScXt29Ah+PTptYuX01rYmcuEX7oCfuhxLxSClf4DWKRocEFgmppjJxCu2GNmuafUah/SSJMEmCQ4QWm1Cf9SgX+RNFs+fzFGRJJfIqioKJpCFsYLT0spezZhhXLCalVE1arYLX2FZM3qu26F7r9tmqkz7LKF+Xl7JwGXYFp3p8/SjeURBBCYEZMjbt5xlVH0dibrNQHh701K+t37mIdVYPbxRvy5peJLOraTjRwWv+dXMXu6bMhA3c49+l37bI1gGzPCSDx5apk9iGQIBE8FzDQ+AsQc2xHIZHG8lUh8xKK41wqFeWFNgKICuez3rUgEIssPmHQvisV/QCAR+/z+AOLrG6ecEzmDm+Xc5LjTyWYkCSSJFiaCpDQa23/5gP/a/osgTP8y0C/AvyifeNpQYPLS6WkyEHgy5HwJhViRwliJoljJEsKypW331dqXmS4d6cols+c7/aTIxpAzByEAXS0NQuO378T9h1ipkljZ0kxGmbLUXWOUjSMEnDmTUUnGb9SNu7MC+W2NLjRvbrYTUoZAxcI5DKOWfj9HdqDuZUNDicdP8XMXgNolHj5m2Q7Z+COKd0EL94LmpJlylqyWSgW/E2EENCcZtDFJuUZDAe+Cpo3BhyQ8VJ8xecbEzw/NlRMJyonmyY0GF8CCg4FZwSiiwibYAGZbzaJlbATMfvsygUD4R0mG6YhfvEwzynodiJb6Z8/pYhAYyp9RtqmKZi0JHCRm1qwp+sf8cBW2lUEVS+bb6l8rS7p4UfBDN/AlSOLlS3MEEpid5Nt3xrfvXbcxPGs9WdTcteMfp14AcwMJDEQyZ0IC09MxuvTp0RzZkKAgNFeQeU8dB+A4bVt+/WaM/AoePXH7LvH4CdAn7CQao6t0gWnLHtDCIT7WjDJcuSYdGooVLEgXerCIlwDdTrx6Zbm9iiOjSJK0Tmeih8aUoGGwWbe124ARzD1Ap+EsGkKqx08BxquwXBnnpY4wFDhyVkFFo9H49Sv54aPxQzhweY3hn4zAjNFqaTNGb6CneWDbgGk+FU3wSW+PAacUaFpg0wqksrjXCjldgxH86Qvel4MfxN8PaB6Bn6/A3x8Bv/38uE3nBGmMijJGRhq//TB++wa8MppCkV+pb99pIvGNswnEYsW8mbZOfoJAWQeofcwpSxot+JpYgfyMxtjG9+E+vBlFvnnHMKbjrm00Gk4w123RIvYvI586MaZ5G6dGOfnqdWz7ruAZAG0LbD80dy4kUwYkSxYwtzEa/tjVYMBJpXe8ONBy5jkGkApQCzAN8A2QDagO4G2Dd5Qqs9dhBLYWeF+vo40ugwHcNvgMrQA1Jn6Cd9QmfloHS+gQCIrZWDXMGVGAYfEmn0VIWCwQM90tepHEZj+Y7QnByCS4bQkClOAiWp5QgCJMc8f2hGKRQCKNY4hUAu6Wpo29m+Gpq8HoabWAJMbv340RXynw++tXY+Q3+k/wZtRPt+dtovnzATo57uFip3sASRIPHwGjCfyLwShG7X6ujHprQxuaUcTzF2AuYR6T3/6WdbRgft+1K5R9Q5ndBhLxufHzF8GPFV8CAwUZA5EMGQQBAUi6AMAxYEvQr02zIP34/UxTo0XNWgeBRB8wv6almun0XIYbfgs0HbKjp0SgwynKFK9TmQWI/hdtWRFUTAz9AyYRk7NKmQMVAGaPju6+rjLLfdzuWspoPgkd1TDtzKNwnA4G0sErk/tH34PW6VqT24FkzCDt30fcpaPT+BCSK6cdfXnnHmCU7b/Idx9cYJQNHc01PgmbVSbaBrAoysc0GSpV8D+yVzVsFFCmPO6GZm9UFOnz0jlhfH1pgwRMrrQpQvv6pmlYEKcHBHGzMh3oE4msInvOVIRJeiiGuqMYUmJSbgwzJk5SbUIO1qfSMAQOyLGPtWdImeNyzNC2ykYJqNN6er5QKKpSSdSiqahhPZaxVmAWIlkyM+oRmftjINmyMaWRVwHn34x6a8OoXEH0RHaNySg0KKcT5ZsryH/PNv3eA9pFy8gP4Z6aj5VKt2yihkgBMQ+ZlPbqM2YUZMqE5syB5MyB5syO5MyJZs/Ko4ssktmGUaYIApKF2RuO+vWLP6Pi64QlXDhHdmAh2GZCINmysBgDgbh1C3HLZoYLlwwHDhvOnIfSD5EgHcBwEArpqAYwH8yOHDB8wJ/AkfP1Bda+IB0w9f2RAPAiADjYbIx8DowKZC780K1EVSrExvLitx4TxyjK5mBwYfLVa1smCJy16baMIohqVqd7ngLn78kz4slTc99V4+cIcK8eSjqGsGvq+DCMImAV+ypsP2abPmcnpAFoIJHEP2KaBqY1dNoOB/8yBTnoz5jfBy8AVQB/pFLawBYJXSpz6ZbRyJjBTrTszTt6IdGZ0c5FR/2wSmqiFxCEQkADOzTh4eujqHmJyep2gfOgUtPxbpWKMhrjVjlVwDcgbV0L4DDYRjso0mjruvjYOiFmL9zOmza5AuB5SyQ2fiPT0RJgmI9NHM9OhA21F50DBzKizAhKX4LxManUR2gVURTQsst85D5AfBlmD00VXziJOGKUPY+afPdeWKaUHU+Vv46yli3zw7NbJEzg7++eLwZmzfQiB0EOCAjPaGw7NqTx/QdBLfc0kP/NKGsNYJ6qyVdv7N2QCD6V1IEUYHgLRe51omjYE2DyS4S7Tv/btLDeWG+ORcL9SI5Ap6VaWAVGKn5WokiLSPrv7NU441P7+7UBj09ZjF8R8jElv5gXdmiYE8DN0Ca8ptd88LgQvGU4Pn4Nir4dlSo+tk5H3n8/3xQcIgJ2r6+CDlcEBKC5g5A8ubEihYQVyrnFyqXTNdyUZ4M5kBhGjbF4u98TQpngO1GU0ZwfrVRRP6KM33/Q6XzgTn4vL9qfbm1dL8vxcjAZ444yr+GajxcB+NIxsWRMrM+H8IQcVATBShQTt2wmbt0ysSVHVuf+9o0WIduIjrsYRRlJcA37wmTkXPUBiCxx6zYd63v+kvz02fjtO72php5ocSgnEC7SjLj3APxo5i6UDeov6dHNeXqh1o4uApKpW7WW+a7EFUYhiCV/qFiV7QrV72lbw/7bGs5e0G/dgV+5xmaXGAQEf58wJlY9bab+0DHfFYtsS/BZSWWMfYNFt5VZTZZfiYu4gC9jdYKKjTFG29+JwHIzBX79ZnT9Zso/+xvOnod0gkgi3/bBw5iW7Zld2BkCzHJXiGmfFX9GMRaMgSLCE2n3S0U5W0gmSfWU6bEdupGvXsNnDJHUZmDk19gOXY2JS6mRdZMoJHs2F3RUQIBTJRh3Q4lYg/F0Ug0P063bBB8tRDKSSjt3UaL//fKFLTeyZOHPKCRzJra36zDZCTiIrvcLgYBwEbpde+1Gwym12sja6kODcvBnlO3exkSVUOLp5MSde9rlq+HjhEh+4Dhx954d6bXZY+GIUSHB/BmFFi3M8gC6F10i5RPUU2e4UoIdAsKNsFtOnZNvjxVygVF2S0ckqovs3RalVBL3H8AHCeE1lp+dhXv2nRSRnDn4ZWNg8X6U7d7GRNn/7AVdd4VJKaidnA42KpDK4ndS0FuDBEhc/jid9i41b47wMe+hAB+jM9CF9BYJiZiRom4q0/c7+ShW+TvFiEpIMrLcU2yRF0KnPtnLZkrIWrLcL2wkXe9Lm2ywtxmRuP+I7dG2Es6JUT6mWmK2rW7s26jXb0i6d2YSKrV0zqX3+fiaN8Ap6HqXGEYTwCzfIlq+6XqX8aJvKohp3qNBJ62IxQIU9TGlwyCm9UHTrnvEcyUykwyAinQp2S+RVEw0vUhqyj+MW2k019OM/yRgOHhHpaZ/x8SCo1gWXXQvkAzMfVB0wTDW/QuFFcsnIaNu3KI1knVtMC+pkyyQSJBsWZGMGQTpAujCVwH+AvBjKvpj2ionNheWoDOawfT/e9NRXKWK+HqxEPYGlm4Mky8vj2ONUVHk0xfEk6f4pSvErTtJU3GRLrLJUFA377BPfBM6K7bFglE2RV4Tna5+/iKePWeEB5NloxsYNbRwISyELn1OV2nOkQ0JDITS722gK2NWrSSsWkna70+guPQHjug2bSGfv/CogY3mYzIKv3SZrVwFF2BZONoRo+iCGLmDHGdwJNzcxSu2AXdB+nTUz18eZ1FIsKhaZWGlCtgfJTkXK4VIdl0nl0s6tZN0bKs/fFQzYy6wCT1CqOBg29qPhotsGSVu3JD/9GH5h6h+XZaHGY6fsiPrpvJJniJSgfyycWHprp4LOH5ANnaUsEY1SKeUTCyBuGnjgBMH4xuUuTkqYbMhl/wQTj5/yfJwu40IPMso4sFD23Qkc4k/DxgNiHTIwIBjB6R9egIfCUpj6qGVQuG7eJ60by+3n1lUpxZTBxw6yvJYrEhhfu6iHUZhJYsjmTKy86Uo2667WIniHtDfmO/yhbJhg3h0SYBIEcoKWBxim4btLs3A2bPZ1mrWHzrC8nDbODZ/RtH1wFh3odLvO8gU/pLuZhSCADqx15wQKRSKaROxooXddTZx8yaMmC3x6AnLJtGCAH9Rs8buYxQgaNuWbA2/u/cZ1dLBoIAbcuNAy0YOE9WtDQUu9UMolM+Y5jZGtWzGnP0T2UhhR0F1bGdbYc4lRqEhwVixImzV1K691gejdL1Ld5l7xYpI/9cbClsaAZiO+WWmMs9TtjRawKrTBR2vP8huPwSGSXp2c9WuskPxdq3ZMmr3PsaSmahhPXcNsRT4TggCRS0NKapK5V0/iW13Q/32XSxzqSTtWrONI3BjVKsWLHfYG39E6Q9aOXyiWjXcU9QSQ0XVq0IhS1NAE+mixEGaM2UUN6pv9RaOa9dsZHd5VOIOm8gOowRymaRjW5bHa1evY+rNNi3dcFuZM7urNRhESoHrxS4lvXswEmTBjO+8UbpZkbRo6pYFVftmlaRHF5YCTT5/iV++an1sV9fJgPjB1ds0BxcTagW+vkyTjyC1LDphmzWBbPhgt3wL+4xCsmYFlGWrphYvtzo2W1axC0vOEGmXUVE/XTlc2u9PRhFM3c7dLDuYSbp14lenhS2j6PsbNIClqsFv3GKoKTqo4JqaSqhmDJFmwH6rhR05zhBIG0fWGk87fzEr5SaXy0L7u+tbJMooNHcQezWlmbPQ6tg8ucWtW7hyW3R5DbiFMW1pKIpfp9m4SXzIQIaC0i5bZfz+g+2x7usR4yg8LRsxhGVXRuL+A0ZSkmzkMFd6b1EarYeykiG8VEE9fMyv7y09g4cUlHRsb+XefwjXrVjD6ti8eaS9urnxizhiFPCIpL27szyReuoMy9qxdPvuIQNduTP89l0oZ2kHhsNHeR8rn/Q3I+1TM3k6y32N8sl/2+778BSjaIUY2o/lHj7jx0+61eutju3VHSsUwp9Rl65AOUsrFp9Op9u5h9+x4jYtGftt9fsPGc6eZ3Vs08bCqpXd+12cMEqgUMjChrM8l3bpCqNlZysMlc/6h3eIwnDidNJsn4ZIduj37Kdi+LSHA9O9fFyY1cz+86d68j+sAhLp08kmj3P7d0HYzAGYTYtS+zONVqcKG2cZUaBz8wb+j+e8pVIZjhyH0pb6gePaJSt52nvTJwmsG0Orx05MrJ4k89gJY5H06ZOBUT4Iopg5jWWIAr90Fcw3ViGKwQOxEsX43Zxu3UYY8Uv10G3fxTKtgTnXt23F2Omj27rT7u5yW4jq1WEfyuYEAcVOZLWLlmnmLWJ1Rl/fgJOHLHv4kB/CYxq3sm32zga+q5aALw/FLtV6UGp1dLV6RqcNX2yA5g7yP7LPMp5Mvnwd06wNm8QLJFPGgOMHPdRVnW1yt3RAX5Z1ZymlUjV0pI9FATc0V5BixhR+96eZOS++zyxE6oPmn1k86CQQiRTLFlrSiVJrlKFDWeYxKebO8BCdODDKB8MUi+eyzGXEb9zSLllhpWSbNJLwivqTb95qrUOIEKkGhlNndKz3Alq5QFMnWJXioijVX6OBjmKlG/7X2+3xPT5WX7ydqh47gR1VEb+tG6zCmgQZ27kHXT2T+4Tkf+IQmicXFMHUBOOXiOiGzXmE+CRdOwFGWbkky1ZpZs1jc6ywXFkglh6tWcKNUQDKAUMMR0+w4lRgoP+h3ZbVi4w/omKatrbfgt6xgixa2G/v9pRe6BjCwozBY9p0Ih484nocmKP9/ltnuSZrOH4KyKT9LuwMgcwQ6H/sAJIxg0e/GedNsorZ/6L587GahKKilH0HWpq24Cv5rljMMmxoCeLxU820mVAOUw1U46fwoBMQPN9VSyzpRNx/QDvtLOhEF9VasdjTdOLDKIFcBr4Vy5w9wAT1KOsVqhLF6Fg8d+g2bYHLU6kDuvWb9dt3cZbUTBn9Nq623F1Ovg9X9h7ANhoxcxrLZVUXgU6aNInzd0uXDi1YwHDkGJvFIrqqk14vrFIpgVSFQsA7BPe0PfzseWGNaq5XAoBIzmjEmfOqv8ZwXWYUBPj7b9mA5s2dYAFFRNIdrB13hY6PRvTvI+3TK2m+IB9G0Yfly4PIZfhFVql3gDyInx/2R4kEa7hSBfLpM/LtO47GHwFIJW7WxJWsdohkBPHgobLn/9g3yPhtFsn9Nq/BiiaU6DL+/BnbsbuR3W5CUeMGimmTkqzrCufIhCXU46foNm9lp9cQxbyZlqvUlFoTC3zTZ8/5RCl2bvGS5joQ7EE+fxnTqTvXXhMChcJv81rL6dhMJ5YVLYWVK/ptWMXDdU8eRvmQpLLfIMOpsyxJ5btsoahBQtoIFR0T270P+0aOCcNUvarf2uXuTcKH8Cyd3ofHtu/C0kizotN/a7GSPOmEFS7kt2NTEvdhco1Rpr5xyh598Ws32OkXzHf5IlHdhCrvlFKp7DMQv36T63XFbVoqZk+HDdRSDJ2Az8NxQ6EgXYDf+pVWdAK+U48+LOmEBhfw27bRE7mwnmVUnP3WqQdbVQNItXCOZTcRSqsDig6/cIkzqVo1Z5/CC5GMxh6gAVc6IVky+21YjYYUtKJl117Gj59Y0SlPbr89W5OeTu5hFM2KmNjYbn+yJRXwqf6dYtWOAcdVI8ey7FlqZf6VL+u7ailsJOW9oYj7D2J79AXmPaej0Pz5/DautixORDx5quzWh2UGIJo7yG/bJstc7ZTHKLP9FtulN3unSP53mOTPnhbHU5qFS7ULlnC9Lpo3j++6lWAQofh6Gwynz6lCh3GtwicsV9Z3zVLLdSfDuQuqgUMpjdabjT33M4oHqSTdOssnjrXc5Kvfs18V9jfXZHMw+ooFs0S1akAh9h7o1m1UT5vJKpvB0pLv0FYxdYKlJa/bvFU9cRrL82AligPXy3N55UnNKB9TDSPl/0LZl4gANFAsmW8ZCsdv3FL1H2L8ybEYokAgGxoqHTwAxiqSHUApqcdMsG0v5ky5oPJxYVYbFHBcPXm67r9tbJVb1Uq+yxcJFIrk/fpuZhQPpwh4n8AXQoNyJoR0Ir8qBwzhUb1NWKOaYt6MZNT4EMbPX8CUSjx+yi0OkSFQsXQB8IoTzvMjSjVgKH6T7U4F7wlTeYBRJqdI/c8s3Rq2+5oE/n6+S+Zb7VoB89M/M3Ub/uN6ZSRTRsW8mZZJTxBJBvz8ReXwMK5ruMJyZRSL5yGZMyXEIW7fVYYOYx8elA7oKxs5zEvME88wymwBb92pnjDZhyDZUQGRDRtEl3mx6BmlP3iELsTBdTu9QCDt96d02CC4+yPpLD29XgPm0E1bOM5/CHjiwFxP8KUpSrt6vWbWXJZiAx6xfNY/HqoY4XWMoietq9eV/Qez31UmrFRBsWC2ZS6s8dNn1fAw/OZtrpdGC+ZXzJlh2+EYwu0gn79QDh7BcgttAptyZFfMnWFl6UVFqUeOY1lqz2wr+q5eZpmglPoZRQ/3uw/KfqEs17npYUqfHvhCwCOyOAWpXbVWM3chW3Vn4ezSymrwAIFYDOXeI6rJYNAtW6VZupJr8qu4Q1v5+DGWlcqBxagaMYZ9zQmsTCnfpQssbcW0wigfUwBQPXYCpwVcScd2sr9HW464easVj/YNaJ5c8qkToWfldgBvRzV6PPn6DTfVlDmTYuY0yxmTUms0M+awTbk2i0ev7vKxI70zsTMpGBXnVm3aop46g/1kRlsFQFmVK2vxDEnt6nXahUt5tO4SN28CKJoEWzjThGqKjtHMnk8XXeEoPOJ2reXjwixzXPBrN1QjxwLbnq28+vspZkxzY7vnFMwoH1ODIFXocE7bomhlNeYvq52bH8LVYyfiV65x/qpymXRgP0nv7tAIdOERkkCZaBYs5lpxBQ0pqJg2yXIXLRUbS6umrTvZnwQrW9p30Rwka1ZvHqEkZVScBThlOqdN0cABlU8aJ2rSyPJNw+Fj6n9n8+iIA1SffMxIUaP6cC2YKwznLmimzSTfvOU8kQ0dJO3ZzbICkeHwUfWkf4w/WFfqw1DZsMHAK/b+7sxJzai4AT15GugZDgNqCgPKJ45DgwskkFOn061cq12+mocRiBUrIhs13KN121IT8Ju3tHMXca4MJxCIWzQF42xVYPjVa/Xk6YymmE4eVqEQ+dx/rQr0QUbZUVa/otUTpuoPHeFiOqCSbp1kQwdZGuLGiEjNnAV0zgvHFDIfU6kq2YghwJaAnEnUynv4GAwvfvEy57GtVEE2dhRWtLClmaddvFy7fhOHmC2G0QtWg/qnoN2lycaoOGV1/JR60jROm2eATyUN7Sfp3tnSHQIzn2bOQsOJUzzuQVi+rHTYIEYPIghaLy1dxWPfGrAjZKP/EtWsbuV9/bdNs3AJy64ZcWwq/YdixlS0QP6UNW7JzCgfU1cbMAvqNm7hFDhCsmWVDR8sbtHM0jonHjzUAOOE+4RKP79SJaX9+4hq17RM2kiLoCjgL2mXriTu3OPMpfz5pEMGiBs3TBhDcLajJ8DzJd+95yCU/n6ysBGSju1Soq+b/IyKJ4N6wjSuNSfQXEHSoaHi5k0saQAMFWBdGE6d4XEbaJ7ckj69xK2aCSSSNEcljVa/74Bu/WauS0z2uWRatNXMms9tCRFBJB3aAtdLEOCfQofRWxhlns/0u/dpZszl2qyBfpz9+9C8srC2gR2oXbJCf+QY50wLU3U4Sfs2kq6dkBzZ0wKXjJ+/6DZt0W3fxaMKOVa8qLR/X1H9OlZ66fxF7cJlxP0HnN3a8aNZtoCBjOJgBALzXbduo2WfbFazW9as0j49xR3aWu62Ah4asCd1W7fzaUopEIjq1BS3byuqUc2jteeTDSRpOHcReDi0s8RVDBAEsEjau4dVoVaCNBw/oV22mmtqC5gTZWNGimrXSAWD6nWMimNCRKRm3iKgsjgXH/X3A/a3pHtny3VASqvT79mn27yVfXqhlfBkzCBu3ULcrjWaN08qoVL4R/2e/fqde3h0dRD4+oKhkPbsaqnAKaVSt22XbsNmq0bM7OZB2fBB4pbNU82c5aWMinvwL19rZs/n4xGhqKhBXWC20anNFt4tfvO2fttOw5Hj/Hpmg/lY0q61qHFDy4TDlOQpKZX6w8f0ew8Qt+7wOFxYrqy4QxtR4waWUVbjx0/a9Zv0O3ZTag3XeQr4wGA8U1k1K69mVJwp8eSpdsFS/pGGrh3FrVpYerrUr2j93v363ft5VLT1MSUBiOrVAbwSVqucMrZgAWPs0mX9ngP4qTNcbWkf0yZOcctmwJwGg5nwLo4bTp8DWs4ALEaOK4FIzhzSfn+K27ZKlRvYUgCj4qTi6TNgoBuOnbDsR8p6dhWK6tUGvBJVr2oVbX/6DBiW+v2HuG47jbcwRfXrips0FFau6J3ZMcSjJ+DbGQ4c4pSeEif36dMDPS9q0URYprRlBA8YDrodu/X7DvAYNDSkoLRPL3HzpqnTL01ZjIp7nO/DdavWgOmWx1zrY0oRFDVrLG7aGCtZPMEaJAj88lX9gcOGk2cotZrPac3C17gBvUzsBdQin7/UHzlmOHyM0ypQwuxTv46kbSt6mrCInRq/fjMcOwn4yTWCF3fW6lWlfXqmhT01KYxRcWbbz1+6rTt0m7dyraNtaXgA3SJqUI/e5PubWpROh5+7qD94GL9wiWV1ODtaq3ZNYBMKq1VJ+l4H5Ju3wEXUHzpKvnrN43AwFOIWTcUtmllW5zJ+idAfOQ5OSy8VchcVOozRtqWkcwc0X16ftIEUyah4U14PZs0t23n09rWINWUBBiHNgXJl4l1kmlrnLxlOnDKcOsu5yoV5WMViYZWK9Gnr1EQCAz06DMaICNq0O3iUn1uIlShGK9j6dRMimTiO33uAX72OnzkH7EZ+d4WVLCHp2FbUtHFa66KSkhkVPze/eq3btlO/9wDXasCMeIOwSmVRzWrC6lUSIu9Atq7fNJw+C6jFNS7823UwZfeOHO4hwdIuXq5ZsISzb4mhwvLlRHVrAwMvLjHcaCSev8CvXMevXCNu3uKnos12NR3GaNc6xeXjQUbZmIIGA376nH7PPjr6xD1PwooFeXIBdgFHAitbKl7DAA0Azg9OThcS5BjdQkOC/baud3shQbpu65R/OTxsPz9RjarCOrXAb/MmTvL1G5pF128AjcRnETz+zAoFICcwGoWVKnj/FibIKI5WUFSU4dAx4JrTjUld/nZo7iCsdCms9B/C0qXQAvl8EISKjcUvXzOcv4hfvMw+ax4rW9p/x2Y3puFSev2vMlUopZKVd1e/rrhZY2GFcsboGPLZc2DLEXfvEXcfcK7da+MmierUFDVqIKxaKQ1mQqYVRlk6GMClNpw8gwNqcd89ZVeAsFIlsWJFsJBgtHAImiuIfPXGcPEyfu4CfQlnJTT8d291Y3Nl/Oat2HZdndywTIqVK4uFFDR+/0F+CDe++8A1Z9K+aZcjO02k2jWFFcvDvnhpiFEJ1Pr5kzbYTp8DTgK/+Lj9sZNI0OACwKLDggsaTpxyGiDx27DKqmqaazCcOqPsMzDpBEUmBa6XsEpFYfWqaP58kDlpmlEJIAigTHBgsAH/+8kztygutgMtlaS7dsGNmxSA2xNdvynXTmdcWQQsXmG5MsBcpFfwYPM7yChHEqlU4tdv4ddvAneLePKUa4sdrpANH0y3DnHv/PDgUWznnvzi+4l4jSiaNw9WvCht3JYsjgUHp+LkBsgoT7JLrycfPiYePKRd9kdP6FQD9w2LQCyW9OwqGzXcE7uDyTdvVYNG8CgMGucRZc6EBhcEjhb4jRYKBuYcLBYPGeUBgmm0xi9fjBGRwKYiP38xfggn330gw8O5ZrKheXKLWzUXd2jr2cqbJGk4dlK3ex9x7Yb95CyBADAHyZEdzRWE5syB5ApCMmU0/WSCDVcho5LZUCTDPxo/fCQ/faa+fzdGfjNGRdG1zbQ6iiSAChJIpSbZzYEVCsbKlrZsipUkXiJJfvhg/BJJaTUmz00GCIOkT0cXB4cuEGQUBARkFAQEZBRkFAQEZBQEBGQUBARkFAQEBGQUBARkFAQEZBQEBARkFAQEZBQEBGQUBARkFAQEBGQUBARkFAQEZBQEBARkFAQEZBQEBGQUBAQEZBQEBGQUBARkFAQEZBQEBARkFIR3IDo6+sf377izliU8BRdBAgMDM2TIIIjvp5w6GBX969fZs2fZn0QsFjdq3BhxoV7x61evHjzg0FwZDHr1GjXYfJIkyePHjul0OvYnr127dkC6dGw++eH9h9u3OXQ3lUqkFStVSpc+nYsP+OKFC9+/f2f/+XLlyuUMCuJ9uY/h4cePHb9y+dKjh49iYmI8Lb5AnAoXKVKhYsW69eoVL1E8NTBq6eIl8+fO5XTIsZMnChQsyPuKof0HALln/3nA3pdv37D55O1btzu0bcvpZiZOnty1ezdP3DYAhmF169frP2AAEBp+Y6VWq0sUKcrpkB69ev49YQKPaz24f3/RgoWAwMll9RQqVKjfwAFgvk5ereVqbXuS5NzSgnCtCwbXw42sW9rw+S6sD+HxrcEhx44cbda4Se8ePZ8+ecLr6ZBJIEOAt6NHjmrdouWF8+eT0Yl49uzZkNBBXTp2+vTxYwpmFEQSAEhq8yZNR44YERkR6W33BsS3VbPmu3ft8pL7uXH9Ohir69euQUZBOAKY+/ft2Vu7Rg1gY2vUGi+5q4iIiPZt271588arxgr4b3/27HXr5k3IKAgn0Ov1wHGtVb369q3bksaicwAcx/v16fs1MtILB0qn04F7SxaVDhmV8vDjx4+/x45t2qjRxQsXkvE2li9d9uTxY68dJaCpxo0ZkyYYpbfbNSypDk81ePniZa/uPXp07fbm9eukv/rPnz9Xr1rl/f7nzRs3kviiWNJ/z8OHDpX84w9+xwI9fvvWLUineFy+dKlR/QZdu3cbPHSon1/SNSzcvXOXVsPHnQsMDKxVu3ahwoXlCjmbzxsMho/h4YAbL56/4HG5jes3lCtfPpUzasO69enSpe/Zq5dMLuN04KOHj8JG/qXVaiGRLAEcKjCkB/cfCBs7plXr1kmzGnPyxAnOooZhf40aBcgvFou5Hjtq9Oizp8+MCQuLioriqqaAUcPjiimJUQDz585dOH++XC5nfwhBEJBLjs2wsL9G7tqxY+KUKYUKFfK03f6QS9oKAIqha9avq1K1Ku+L1qpTe8+B/W1atARuJKcQxeNHj0qXKZPKGeVjWnhVKpWQCe7F7Vu3mzZs9EepUrVq1woMzOCh0AUww9ivm5vRr39/V+hkRo4cOf6dNbNPr96cjnrz+k2aYBSE53Dv7l3w47nzczW9hEJh33793HLpmrVqAR/s2dOn7A9JgvRCS8DoOYTHUaZsWU4WvhPzr3YtTp/XajWQURCpCkG5gtx4tmzZsnvzl4WMgvA4pFKpG8+WPjA9ZBQERFoBZJT3QiKRjB479vK1azfv3lmyfFlISAgcE+8HjPV5L5auWB6/+7hBw4b16tc/sG//nNmzvTM5FQLqKG9Hvvz5rR4VgrRs3er0ubODhgxOyiQA18Gp0IBTRP/6BRkF4U4vf8iwYSfOnK7foEFKuedPHz+58WyfP3+GVh8TOXLmbN+hfabMmdkfghvwWzdvHti/H5LKx5Q9AGzC8+fOTZowMXk3gbMBeHBajUYqk7nlbOfPnefojkpTOaMKBhfcsXu3r68v1wM7dOpYoVLFMaPCIKPMqFGz5vFTFZctWbp65UoPFfGyi4AAbhWa9Hr9urXrBg4Kdf3SVy5fefzoEadDkjIlP3msPmC08KCTGW3btQsOCYZcspiAJcP/GnH4+LEyZZMudS0oVxDXDPfFCxfeuunqNpxvX7+OHjmS61F58uZJ5YwKCnJpBT1nziBIJGYMI1++rTt2TJoy2V2WlVNfrlDhwpwOIQiiR9euW/77jyR4bua/euVKqxYtIiIiuNlgGFa8eJLW8YPR81QCBEG6dOsG7MAxYaOvXb3q6cvVqVuXa8EzYPtN/Hv86hUr69arVzAkOCAggM1RWq02/EP4ubNnH9y/z+M+q1StmjSzDGRUKo1Y5My5act/K1esmD9nrkdLu7Rr337ZkiU8ihB++vRp/bp1STYgnTp3TuqpDUphKgPwcPr1779l+/ZMmTJ57ipZsmbp2r27lw9FqdKla3JMVIeMgrCPMmXLbNu506OkGjZ8eM4g7/VpJRLJv7NmJn3FZsioVItcuXP9M+Nfz51fJpetWbeWd9jW017l3AXz8+XLlwyXhpKXiuHp3eD58uffvmuXRzUhD4jF4oWLFydXTomrkYkCBQoGBASwd4JlcnlG1x5AcEjwjevX2X8+W/ZsbD+ZLRtwD9QqNcvPoyiaK1dulh8uUrTozRs32BfaTx+YnmU0zAGkUmn+AgU4ZdZmz5GD6+M4cOTw2LDR586e9QY6FQwuOHf+fK7BfXf6sbAjG4RbcObU6cWLFnFNaHAjsmfP/r8B/du374BiaDKOA2QUhDvx5PFjc0e2Z0+fJUFiFPCX8ubLV75Chbr16laqXNmVTn+QURBeDZIgI79GRv2I8lDhFOAs+QcEAEPd2za2QEZBQLgT/xdgAMj8MaQ9HbnFAAAAAElFTkSuQmCC',
        width: 30,
      },
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
          widths: [ '5%', '20%', '25%', '20%', '25%', '5%' ],
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

  const handlePDF = (e: any) => {
    e.preventDefault();
    pdfMake.createPdf(docDefinition).open();
  };

  return (
    <IonPage className="print__collection-delivery-page">
      <IonHeader className="noprint">
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref={ROUTES.TABS_COLLECTION_DELIVERY}></IonBackButton>
          </IonButtons>
          <IonTitle>Preview report</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton
              size="small"
              title="Download"
              onClick={handlePDF}
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
                      <th colSpan={6}>
                        {`${schedules[0].deliverySchedule} run`}
                      </th>
                    </tr>
                    <tr>
                      <th style={{width: '5%'}} className="ion-text-center">#</th>
                      <th style={{width: '20%'}}>Invoice</th>
                      <th style={{width: '25%'}}>Customer</th>
                      <th style={{width: '20%'}}>Receiver</th>
                      <th style={{width: '25%'}}>Location</th>
                      <th style={{width: '5%'}}>Time</th>
                    </tr>
                  </thead>
                  {(collectionDelivery && collectionDelivery.length > 0) &&
                    <tbody className="print__tbody">
                        {schedules.map((item: CollectionDelivery, index: number) => (
                        <tr key={index}>
                          <td style={{width: '5%'}} className="ion-text-center">{index + 1}</td>
                          <td style={{width: '20%'}}>{item.deliveryInvoice}</td>
                          <td style={{width: '25%'}}>{item.deliveryClient?.clientName}</td>
                          <td style={{width: '20%'}}>{item.deliveryReceiver}</td>
                          <td style={{width: '25%'}}>{`${item.deliveryClient?.clientAddress.suburb}, ${item.deliveryClient?.clientAddress.state.toUpperCase()} ${item.deliveryClient?.clientAddress.postcode}`}</td>
                          <td style={{width: '5%'}}>{item.deliveryTime ? timeFormatHHmm(item.deliveryTime) : ''}</td>
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
