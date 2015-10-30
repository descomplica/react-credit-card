'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from '../src/creditCard';

ReactDOM.render(
  <CreditCard success={function(data){console.log(data)}} />,
  document.getElementById('demo')
);
