# React Component Credit Card

A Simple React component Credit Card

![Credit Card example](https://cloud.githubusercontent.com/assets/602111/10577543/e33e37ea-764a-11e5-830d-1d7f1a8d24c2.png)

### Getting Started

```shell
$ git clone -o your-component -b master --single-branch https://github.com/descomplica/react-credit-card.git your-component
```

## Browser Support

We do care about it.

| <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/chrome/chrome_64x64.png" width="48px" height="48px" alt="Chrome logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/firefox/firefox_64x64.png" width="48px" height="48px" alt="Firefox logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/internet-explorer/internet-explorer_64x64.png" width="48px" height="48px" alt="Internet Explorer logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/opera/opera_64x64.png" width="48px" height="48px" alt="Opera logo"> | <img src="https://raw.githubusercontent.com/alrra/browser-logos/master/safari/safari_64x64.png" width="48px" height="48px" alt="Safari logo"> |
|:---:|:---:|:---:|:---:|:---:|
| Latest ✔ | Latest ✔ | IE 9+ ✔ | Latest ✔ | Latest ✔ |

### How to run the demo
```shell
$ cd your-component
$ npm install                    # Install development dependencies
$ npm run bundle                 # Build scripts
$ npm start                      # Run webpack dev server
```

## Usage in yor project
```shell
$ npm install --save @descomplica/react-credit-card
$ npm install --save react
$ npm install --save react-dom
```

```JS
'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import CreditCard from '@descomplica/react-credit-card';

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
import CreditCard from '@descomplica/react-credit-card';

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

# Tests
**react-credit-card** is tested using [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/0.13/index.html). To run the tests:

1. `npm test`

## LICENSE

MIT: https://github.com/descomplica/react-credit-card/blob/master/LICENSE
