import React, { useEffect, useState } from 'react';
import { connect } from '../../data/connect';
import {
  IonContent,
  IonFooter,
  IonLoading,
  IonToolbar
} from '@ionic/react';
import { StatusColor } from '../../enum/StatusColor';
import { ExpensesGroup } from '../../models/Expenses';
import LsGroupExpenses from '../list/GroupExpenses';
import LsMainCard from '../card/MainCard';
import LsMainChip from '../chip/MainChip';
import * as selectorsExpenses from '../../data/expenses/expenses.selectors';
import { AppColor } from '../../enum/AppColor';

interface StateProps {
  expenses: ExpensesGroup | null;
}

interface DispatchProps {}

interface MainExpensesProps extends StateProps, DispatchProps {}

const LsMainExpenses: React.FC<MainExpensesProps> = ({
  expenses
}) => {

  const [hasRecord, setHasRecord] = useState<boolean>(false);
  const [isLoaded, setIsLoaded] = useState<boolean>(true);

  useEffect(() => {
    if (expenses && expenses.groups && expenses.groups.length > 0) {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
      setHasRecord(true);
    } else {
      setTimeout(() => {
        setIsLoaded(false);
      }, 1000);
      setHasRecord(false);
    }
  }, [
    expenses,
  ]);

  return (
    <>
      <IonLoading message="Fetching expenses..." duration={0} isOpen={isLoaded}></IonLoading>
      <IonContent>
        {expenses && expenses.groups && expenses.groups.length > 0 &&
          <LsGroupExpenses data={expenses} groupBy="expenseTypeDescription"></LsGroupExpenses>
        }
        {!hasRecord &&
          <LsMainCard color={StatusColor.WARNING} message="No records found!"></LsMainCard>
        }
      </IonContent>
      <IonFooter color={AppColor.TERTIARY}>
        <IonToolbar>
          <LsMainChip color={AppColor.PRIMARY} text={`Total: $${expenses?.totalAmount.toFixed(2)}`} />
        </IonToolbar>
      </IonFooter>
    </>
  );
};

export default connect<{}, StateProps, DispatchProps> ({
  mapStateToProps: (state) => ({
    expenses: selectorsExpenses.getExpensesByGroup(state),
  }),
  mapDispatchToProps: ({}),
  component: React.memo(LsMainExpenses)
});
