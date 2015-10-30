# React Component Credit Card

A Simple React component Credit Card

![Credit Card example](https://cloud.githubusercontent.com/assets/602111/10577543/e33e37ea-764a-11e5-830d-1d7f1a8d24c2.png)

### Getting Started

```shell
$ git clone -o your-component -b master --single-branch https://github.com/descomplica/react-credit-card.git your-component
```

### Commands run local
```shell
$ cd your-component
$ npm install                    # Install development dependencies
$ npm run bundle                 # Build scripts
$ npm start                      # Run webpack dev server
```

## Usage in yor project
```shell
$ npm install --save reactjs-credit-card
$ npm install --save react
$ npm install --save react-dom
```

```JS
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from 'reactjs-credit-card';

let callback = (data) => {
  /* data
    {
      CardNumber: "4111111111111111",
      CvvNumber: "123",
      ExpMonth: "12",
      ExpYear: "2022",
      HolderName: "giovanni keppelen"
    }
  */
}

ReactDOM.render(
  <CreditCard success={callback} />,
  document.getElementById('demo')
);
```

## With installments
```JS
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from 'reactjs-credit-card';

let callback = (data) => {
  /* data
    {
      CardNumber: "4111111111111111",
      CvvNumber: "123",
      ExpMonth: "12",
      ExpYear: "2022",
      HolderName: "giovanni keppelen",
      Installments: 2
    }
  */
}

ReactDOM.render(
  <CreditCard price={200.00} installments={6} success={callback} />,
  document.getElementById('demo')
);
```

```HTML
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Credit Card Demo</title>
</head>
<body>
  <div class="demo" id="demo"></div>
  <script src="/dist/your-script.js"></script>
</body>
</html>
```

## LICENSE

MIT: https://github.com/descomplica/react-credit-card/blob/master/LICENSE
