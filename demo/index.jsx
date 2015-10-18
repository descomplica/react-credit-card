'use strict';

import React from 'react';
import ReactDOM from 'react-dom';

import CreditCard from '../src/creditCard';

class Demo extends React.Component {

  render() {
    return (
      <CreditCard success={function(data){console.log(data)}} />
    );
  }

}

ReactDOM.render(
  <Demo />,
  document.getElementById('demo')
);
