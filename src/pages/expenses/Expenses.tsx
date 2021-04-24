import React, { useEffect, useState } from 'react';
import './Expenses.scss';
import {
  IonButton,
  IonButtons,
  IonCol,
  IonFab,
  IonFabButton,
  IonFabList,
  IonGrid,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as MOMENT  from '../../util/moment';
import {
  endPeriod,
  startPeriod,
} from '../../util/moment';
import { Period } from '../../models/Period';
import { setExpenses } from '../../data/expenses/expenses.actions';
import LsMainExpenses from '../../components/expenses/MainExpenses';
import { AppColor } from '../../enum/AppColor';
import { add, ellipsisVertical, search } from 'ionicons/icons';
import LsModalExpensesAdd from '../../components/modal/ModalExpensesAdd';
import LsModalExpensesSearch from '../../components/modal/ModalExpensesSearch';
import { setModalExpensesAddShow, setModalExpensesSearchShow } from '../../data/modal/modal.actions';
import LsTransition from '../../components/time/Transition';
import { setExpenseTypeByStatusActive } from '../../data/expenseType/expenseType.actions';
import { useWindowSize } from '../../hooks/useWindowSize';
import { MOBILE_VIEW } from '../../constants/App';
import { setBankByStatusActive } from '../../data/bank/bank.actions';

interface StateProps {
  isLoggedIn: boolean;
}

interface DispatchProps {
  setExpenses: typeof setExpenses;
  setModalExpensesSearchShow: typeof setModalExpensesSearchShow;
  setModalExpensesAddShow: typeof setModalExpensesAddShow;
  setExpenseTypeByStatusActive: typeof setExpenseTypeByStatusActive;
  setBankByStatusActive: typeof setBankByStatusActive;
}

interface ExpensesProps extends StateProps, DispatchProps {}

const ExpensesPage: React.FC<ExpensesProps> = ({
    isLoggedIn,
    setExpenses,
    setModalExpensesSearchShow,
    setModalExpensesAddShow,
    setExpenseTypeByStatusActive,
    setBankByStatusActive,
  }) => {

    const [height, width] = useWindowSize();
    const [period, setPeriod] = useState<Period>({
    startDate: startPeriod(MOMENT.currentMonthYYYMMDD),
    endDate: endPeriod(MOMENT.currentMonthYYYMMDD),
  });

  const [isCustomSearch, setIsCustomSearch] = useState<boolean>(false);
  const [customPeriod, setCustomPeriod] = useState<Period>(period);
  const [params, setParams] = useState<string>('all');

  useEffect(() => {
    if (isLoggedIn) {
      if (!isCustomSearch) {
        // setExpenses(userProfileServer.userId, period, params);
      } else {
        setIsCustomSearch(false);
        setPeriod(customPeriod);
      }
    }
  }, [
    isLoggedIn,
    params,
    period,
    isCustomSearch,
    customPeriod,
    setExpenses,
    setExpenseTypeByStatusActive,
    setBankByStatusActive,
  ]);

  return (
    <IonPage id="expenses-page">
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton auto-hide="true"></IonMenuButton>
          </IonButtons>
          {width <= MOBILE_VIEW &&  <IonTitle>Expenses</IonTitle>} 
          {width <= MOBILE_VIEW &&
          (isLoggedIn) &&
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small">
              <IonIcon icon={ellipsisVertical} />
            </IonFabButton>
            <IonFabList side="start">
              <IonFabButton 
                onClick={() => [
                  setModalExpensesSearchShow(true),
                  // setExpenseTypeByStatusActive(userProfileServer.userId)
                ]}
              >
                <IonIcon
                  color={AppColor.TERTIARY}
                  icon={search}
                />
              </IonFabButton>
              <IonFabButton
                onClick={() => [
                  setModalExpensesAddShow(true),
                  // setExpenseTypeByStatusActive(userProfileServer.userId),
                  // setBankByStatusActive(userProfileServer.userId),
                ]}
              >
                <IonIcon color={AppColor.SUCCESS} icon={add}/>
              </IonFabButton>
            </IonFabList>
          </IonFab>}

          {width > MOBILE_VIEW && 
          <IonGrid className="ion-no-padding">
            <IonRow className="ion-no-padding">
              <IonCol size="2" className="ion-no-padding">
                <IonGrid>
                  <IonRow>
                    <IonCol className="ion-no-padding">
                      <IonButton
                        shape="round"
                        color={AppColor.SECONDARY}
                        size="small"
                        className="ion-text-capitalize"
                      >
                        Clear filters
                      </IonButton>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonCol>
              <IonCol size="8" className="ion-no-padding">
                <LsTransition
                  dayOrMonthOrYear='month'
                  period={period}
                  setPeriod={setPeriod}
                />
              </IonCol>
              <IonCol size="1" className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.LIGHT} size="small" title="Search">
                    <IonIcon
                      icon={search}
                      onClick={() => [
                        setModalExpensesSearchShow(true),
                        // setExpenseTypeByStatusActive(userProfileServer.userId)
                      ]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
              <IonCol size="1" className="ion-no-padding">
                <IonFab vertical="center" horizontal="end">
                  <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
                    <IonIcon
                      icon={add}
                      onClick={() => [
                        setModalExpensesAddShow(true),
                        // setExpenseTypeByStatusActive(userProfileServer.userId),
                        // setBankByStatusActive(userProfileServer.userId),
                      ]}
                      size="small"
                    />
                  </IonFabButton>
                </IonFab>
              </IonCol>
            </IonRow>
          </IonGrid>
          }
        </IonToolbar>
        {width <= MOBILE_VIEW &&
        <IonToolbar>
          <LsTransition
            dayOrMonthOrYear="month"
            period={period}
            setPeriod={setPeriod}
          />
        </IonToolbar>}
      </IonHeader>
      <LsMainExpenses />
      <LsModalExpensesSearch
        setIsCustomSearch={setIsCustomSearch}
        setCustomPeriod={setCustomPeriod}
        setParams={setParams}
      />
      <LsModalExpensesAdd
        // setIsCustomSearch={setIsCustomSearch}
        // setCustomPeriod={setCustomPeriod}
        // setParams={setParams}
      />

      {/* <IonModal isOpen={showAddRecordModal} onDidDismiss={() => setShowAddRecordModal(false)}>
        <form noValidate onSubmit={submitAddRecord}>
        <IonList lines="full">
          <IonListHeader>
            <IonLabel>Add New Expense</IonLabel>
            <IonButton onClick={() => setShowAddRecordModal(false)}>
              <IonIcon icon={close} color={AppColor.TERTIARY}>Close</IonIcon>
            </IonButton>
          </IonListHeader>
          <IonItem>
            <IonLabel>Location</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Date</IonLabel>
            <IonDatetime displayFormat="MMM DD, YYYY" placeholder="Select Date" value={selectedStartDate} onIonChange={e => setSelectedStartDate(e.detail.value!)}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel>Bank</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Expense</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Comments</IonLabel>
          </IonItem>
          <IonItem>
            <IonLabel>Amount</IonLabel>
          </IonItem>
          <IonItem lines="none">
              <div slot="end" className="ion-padding-vertical">
                <IonButton type="submit" shape="round" color={AppColor.SUCCESS}>Add Expense</IonButton>
              </div>
            </IonItem>
        </IonList>
        </form>
      </IonModal> */}
        {/* <LsModalExpensesAdd /> */}
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
  }),
  mapDispatchToProps: ({
    setExpenses,
    setModalExpensesSearchShow,
    setModalExpensesAddShow,
    setExpenseTypeByStatusActive,
    setBankByStatusActive,
  }),
  component: React.memo(ExpensesPage)
});
