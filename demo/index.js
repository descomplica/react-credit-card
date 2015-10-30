'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from '../src/creditCard';

let callback = (data) => {
  console.log(data);
}

ReactDOM.render(
  <CreditCard price={200.00} installments={6} success={callback} />,
  document.getElementById('demo')
);
