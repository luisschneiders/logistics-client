import React, { useEffect, useState } from 'react';
import './Transition.scss';
import {
  arrowBackOutline,
  arrowForwardOutline
} from 'ionicons/icons';
import { AppColor } from '../../enum/AppColor';
import {
  IonButton,
  IonCol,
  IonDatetime,
  IonGrid,
  IonIcon,
  IonRow
} from '@ionic/react';
import { Period } from '../../models/Period';
import {
  dateFormatYYYYMMDD,
  decreasePeriod,
  endPeriod,
  increasePeriod,
  startPeriod,
} from '../../util/moment';
import * as MOMENT  from '../../util/moment';

interface ContainerProps {
  dayOrMonthOrYear: 'day' | 'month' | 'year';
  period: Period;
  setPeriod: (period: Period) => void;
}

const LsTransition: React.FC<ContainerProps> = ({ dayOrMonthOrYear, period, setPeriod }) => {
  const [deliveryDate, setDeliveryDate] = useState<string>(MOMENT.now.toString());
  const [datetimeDisplayFormat, setDatetimeDisplayFormat] = useState<string>('');

  useEffect(() => {

    if (dayOrMonthOrYear === 'year') {
      setDatetimeDisplayFormat('YYYY');
    } else if (dayOrMonthOrYear === 'month') {
      setDatetimeDisplayFormat('MMM YYYY');
    } else {
      setDatetimeDisplayFormat('MMM, DD YYYY');
    }

    setDeliveryDate(period.startDate);

  },[
    period,
    dayOrMonthOrYear,
  ]);

  const handleOnChange = async (e: any) => {

    let period: Period = {
      startDate: '',
      endDate: ''
    };

    if (dayOrMonthOrYear === 'year') {
      period = {
        startDate: startPeriod(e.detail.value, 'year'),
        endDate: endPeriod(e.detail.value, 'year'),
      }
    } else if (dayOrMonthOrYear === 'month') {
      period = {
        startDate: startPeriod(e.detail.value),
        endDate: endPeriod(e.detail.value),
      }
    } else {
      period = {
        startDate: dateFormatYYYYMMDD(e.detail.value),
        endDate: dateFormatYYYYMMDD(e.detail.value),
      }
    }

    setDeliveryDate(e.detail.value!);
    setPeriod(period);

  }

  const setDecreasePeriod = async () => {
    const newPeriod: Period = decreasePeriod(period, dayOrMonthOrYear)
    setPeriod(newPeriod);
  }

  const setIncreasePeriod = async () => {
    const newPeriod: Period = increasePeriod(period, dayOrMonthOrYear)
    setPeriod(newPeriod);
  }

  return (
    <IonGrid className="transition">
      <IonRow>
        <IonCol className="ion-text-right ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={setDecreasePeriod}>
            <IonIcon icon={arrowBackOutline}/>
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-center ion-no-padding">
          <IonButton
            color={AppColor.LIGHT}
            size="small"
          >
            <IonDatetime
              className="transition__datetime"
              displayFormat={datetimeDisplayFormat}
              placeholder="Delivery Date"
              value={deliveryDate}
              onIonChange={handleOnChange}
            />
          </IonButton>
        </IonCol>
        <IonCol className="ion-text-left ion-no-padding">
          <IonButton color={AppColor.LIGHT} size="small" onClick={setIncreasePeriod}>
            <IonIcon icon={arrowForwardOutline}/>
          </IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default LsTransition;
