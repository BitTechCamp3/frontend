import React, { Suspense, useEffect } from 'react';

import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from 'recoil';
import {
  currentCoinState,
  transactionQuery,
  transactionState,
} from '../states/state';

import Transaction from './Transaction';

function TransactionContainer() {
  const [transaction, setTransaction] = useRecoilState(transactionState);
  const [getTransactionState, ,] = useRecoilStateLoadable(transactionQuery);
  const currentCoin = useRecoilValue(currentCoinState);
  // console.log('$TransactionContainer: ', transaction);
  /*
  crncCd,
  coinType
  buySellGb: '1' or '2'
  contPrice
  contQty
  */
  useEffect(() => {
    if (getTransactionState.state === 'hasValue') {
      setTransaction(getTransactionState.contents);
    }
  }, [getTransactionState]);
  return <Transaction transaction={transaction} symbol={currentCoin.symbol} />;
}

export default TransactionContainer;
