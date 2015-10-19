'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from '../src/creditCard';

ReactDOM.render(
  <CreditCard success={function(data){console.log(data)}} />,
  document.getElementById('demo')
);
ReactDOM.render(
  <CreditCard installments={3} price={1300} />,
  document.getElementById('demo1')
);
ReactDOM.render(
  <CreditCard />,
  document.getElementById('demo2')
);
