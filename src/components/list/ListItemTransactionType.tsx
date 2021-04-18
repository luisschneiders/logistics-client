import React, { useEffect, useState } from 'react';
import {
  IonLabel,
  IonItem,
  IonList,
  IonButton,
  IonToggle,
} from '@ionic/react';
import { connect } from '../../data/connect';
import * as selectorsUser from '../../data/user/user.selectors';
import * as selectorsSessions from '../../data/sessions/sessions.selectors';
import * as selectorsTransactionType from '../../data/transactionType/transactionType.selectors';
import { TransactionType, TransactionTypeList } from '../../models/TransactionType';
import { AppColor } from '../../enum/AppColor';
import { StatusColor } from '../../enum/StatusColor';
import {
  setTransactionTypeList,
  updateTransactionType
} from '../../data/transactionType/transactionType.actions';
import { PageListItem } from '../../enum/PageListItem';
import LsMainCard from '../card/MainCard';
import * as ROUTES from '../../constants/Routes';
import { transactionTypeOptions } from '../../pages/transaction-type/TransactionTypeOptions';

interface StateProps {
  isLoggedIn: boolean;
  isFetching: boolean;
  transactionTypeList: TransactionTypeList;
}

interface DispatchProps {
  setTransactionTypeList: typeof setTransactionTypeList;
  updateTransactionType: typeof updateTransactionType;
}

interface ListTransactionTypeProps extends StateProps, DispatchProps {}

const LsListItemTransactionType: React.FC<ListTransactionTypeProps> = ({
    isLoggedIn,
    isFetching,
    transactionTypeList,
    setTransactionTypeList,
    updateTransactionType,
  }) => {
  const [transactionType, setTransactionType] = useState<TransactionType[]>([]);
  const [transactionTypeOptionsList, setTransactionTypeOptionsList] = useState<any[]>([]);

  const transactionActionsOptions = async () => {
    const actions = transactionTypeOptions();
    setTransactionTypeOptionsList(await actions);
  }

  useEffect(() => {
    transactionActionsOptions();
    if (transactionTypeList) {
      setTransactionType(transactionTypeList.transactionsType);
    }
  }, [transactionTypeList, isFetching]);

  const loadMore = () => {
    if (isLoggedIn) {
      let newPage: number = transactionTypeList.pagination.page;
      ++newPage;
      // setTransactionTypeList(userProfileServer.userId, newPage, PageListItem.ITEM_12);
    }
  };

  const changeStatus = async (transactionType: TransactionType) => {
    if (transactionType) {
      const newTransactionType: TransactionType = transactionType;
      newTransactionType.transactionTypeIsActive = !transactionType.transactionTypeIsActive

      updateTransactionType(newTransactionType);
    }
  }
  
  return (
    <>
      {transactionType && transactionType.length > 0 &&
        <IonList lines="full">
          {transactionType.map((item: TransactionType, index: number) => (
            <IonItem key={index}>
              <IonLabel>
                <IonItem
                  className="ion-text-uppercase"
                  lines="none"
                  routerLink={`${ROUTES.TABS_TRANSACTION_TYPE}/${item.transactionTypeId}`}
                >
                  <IonLabel>
                    <div className="ion-text-capitalize">Transaction: </div>
                    <div className={item.transactionTypeIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {item.transactionTypeDescription}
                    </div>
                  </IonLabel>
                  <IonLabel>
                    <div className="ion-text-capitalize">Action: </div>
                    <div className={item.transactionTypeIsActive ? StatusColor.IS_ACTIVE : StatusColor.IS_INACTIVE}>
                      {transactionTypeOptionsList.map((type: any, key: number) => {
                        return type.value === item.transactionTypeAction ? <span key={key}>{type.description}</span> : '';
                      })}
                    </div>
                  </IonLabel>
                </IonItem>
              </IonLabel>
              <div slot="end">
                <IonToggle color={StatusColor.SUCCESS} checked={item.transactionTypeIsActive} onClick={() => changeStatus(item)} />
              </div>
            </IonItem>
          ))}
        </IonList>
      }
      {transactionType && transactionType.length > 0 && (transactionTypeList.pagination.pageCount > transactionTypeList.pagination.page) &&
        <div className="ion-text-center">
          <IonButton fill="clear" color={AppColor.TERTIARY} disabled={isFetching} onClick={loadMore}>Load more...</IonButton>
        </div>
      }
      {!transactionType.length && 
        <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
      }
    </>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    isFetching: selectorsTransactionType.isFetchingTransactionTypeList(state),
    isLoggedIn: selectorsUser.getIsLoggedIn(state),
    transactionTypeList: selectorsTransactionType.getTransactionTypeList(state),
  }),
  mapDispatchToProps: ({
    setTransactionTypeList,
    updateTransactionType,
  }),
  component: LsListItemTransactionType
});
