import React, { Suspense, useEffect, useRef } from 'react';

import { useRecoilState, useRecoilStateLoadable, useRecoilValue } from 'recoil';

import {
  orderbookState,
  orderbookQuery,
  currentCoinState,
} from '../states/state';

import Orderbook from './Orderbook';

function OrderbookContainer() {
  const [getOrderbookState, refetchOrderbook] =
    useRecoilStateLoadable(orderbookQuery);
  const [orderbook, setOrderbook] = useRecoilState(orderbookState);
  const intervalObj = useRef('');
  // console.log('$OrderbookContainer: ');
  // console.log(getOrderbookState);
  // console.log(orderbook);
  // const [orderbook, refetchOrderbook] = useRecoilStateLoadable(orderbookQuery);

  /*

  {
    ask: [
      {p, q}, 가Query
      {p, q},
      {p, q},
    ]
    bid: [],
    timestamp: string
  }
  */
  useEffect(() => {
    if (getOrderbookState.state === 'hasValue') {
      setOrderbook(getOrderbookState.contents);
    }
  }, [getOrderbookState]);

  useEffect(() => {
    intervalObj.current = setInterval(() => {
      refetchOrderbook();
    }, 3000);
    return () => {
      // 컴포넌트가 사라질 때 인터벌 없애주기
      clearInterval(intervalObj.current);
      intervalObj.current = '';
    };
  }, []);

  return <Orderbook orderbook={orderbook} />;
}

export default React.memo(OrderbookContainer);
