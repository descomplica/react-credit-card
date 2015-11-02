# React Component Credit Card - [![status](https://circleci.com/gh/descomplica/react-credit-card.svg?style=shield&circle-token=75e1e9d1d6f61f23169223cd11c261a3328b26d7)](https://circleci.com/gh/descomplica/react-credit-card)

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

## CommonJS

Install via NPM

```shell
$ npm install --save @descomplica/react-credit-card
```

Then:

```js
import CreditCard from '@descomplica/react-credit-card';

…
  callback = (data) => {
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

  render() {
    return (
      <CreditCard success={callback} />
    );
  }

…
```

### With installments
```js
…
  render() {
    return (
      <CreditCard price={200.00} installments={6} success={callback} />
    );
  }
…
```

### Browser

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Credit Card Demo</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.1/react-with-addons.min.js" ></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/react/0.14.1/react-dom.min.js"></script>
  <script src="https://dnnsjdj5swfc3.cloudfront.net/front-end/libs/react-credit-card.js"></script>
</head>
<body>
  <div class="demo" id="demo"></div>

  <script>
    var CreditCard = CreditCard;
    var callback = function(data) {
    }

    ReactDOM.render(
      React.createElement(CreditCard, { success: callback }),
      document.getElementById('demo')
    );
  </script>
</body>
</html>
```

### Development
```shell
$ npm install
$ npm start
```

# Tests
**react-credit-card** is tested using [Jasmine](http://jasmine.github.io/) and [Karma](http://karma-runner.github.io/0.13/index.html). To run the tests:

1. `npm test`

## LICENSE

MIT: https://github.com/descomplica/react-credit-card/blob/master/LICENSE
