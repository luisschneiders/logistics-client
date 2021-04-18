import {
  IonButtons,
  IonContent,
  IonFab,
  IonFabButton,
  IonHeader,
  IonIcon,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';
import React, { useEffect } from 'react';
import { connect } from '../../data/connect';
import { AppColor } from '../../enum/AppColor';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsExpenseType from '../../data/expenseType/expenseType.selectors';
import { PageListItem } from '../../enum/PageListItem';
import LsListItemExpenseType from '../../components/list/ListItemExpenseType';
import {
  setExpenseTypeList
} from '../../data/expenseType/expenseType.actions';
import { add } from 'ionicons/icons';
import { setModalExpenseTypeShow } from '../../data/modal/modal.actions';
import LsModalExpenseType from '../../components/modal/ModalExpenseType';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
}

interface DispatchProps {
  setExpenseTypeList: typeof setExpenseTypeList;
  setModalExpenseTypeShow: typeof setModalExpenseTypeShow;
}

interface ExpensesTypeProps extends StateProps, DispatchProps {}

const ExpenseTypePage: React.FC<ExpensesTypeProps> = ({
  isLoggedIn,
  isFetching,
  setExpenseTypeList,
  setModalExpenseTypeShow
}) => {
  
  useEffect(() => {
    if (isLoggedIn) {
      // setExpenseTypeList(userProfileServer.userId, 1, PageListItem.ITEM_12);
    }
  }, [
    isLoggedIn,
    setExpenseTypeList,
    setModalExpenseTypeShow,
  ]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Expense Categories</IonTitle>
          <IonFab vertical="center" horizontal="end">
            <IonFabButton color={AppColor.TERTIARY} size="small" title="Add new record">
              <IonIcon 
                icon={add}
                onClick={() => setModalExpenseTypeShow(true)}
                size="small"
              />
            </IonFabButton>
          </IonFab>
        </IonToolbar>
      </IonHeader>
      <IonLoading message="Please wait..." duration={0} isOpen={isFetching}></IonLoading>
      <IonContent className="ion-padding">
        <LsListItemExpenseType />
        <LsModalExpenseType />
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    isFetching: selectorsExpenseType.isFetchingExpenseTypeList(state),
  }),
  mapDispatchToProps: ({
    setExpenseTypeList,
    setModalExpenseTypeShow,
  }),
  component: React.memo(ExpenseTypePage)
});
