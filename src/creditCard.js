'use strict'

import React from 'react';
import Select from 'react-select';
import creditcard from 'creditcard';
import classnames from 'classnames';
import CardUI from '@components/CardUI';
import styles from '@styles/creditcard.scss';

class CreditCard extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            isBuying: true,
            scheme: null,
            CCexpiry: ''
        };
    }

    static defaultProps = {
      installments: null
    }

    change = (e) => {
        var value = {};
        var name = e.target.name;
        value[name] = e.target.value;

        if ( name == 'CardNumber' ) {
            value.parseCardNumber = creditcard.parse(e.target.value);
            value[name] = value.parseCardNumber.formatted;
            value.scheme = value.parseCardNumber.scheme ? value.parseCardNumber.scheme.toLowerCase() : '';
        }

        if ( name == 'ClickTerms' ) {
            if ( this.state.Terms ) {
                this.state.Terms = false
            }
            else {
                this.state.Terms = true
            }
            this.validateTermOfUse();
        }

        if ( name == 'CCexpiry') {
          value.CCexpiry = this.expiry(e.target.value);
        }

        this.setState(value);
    };

    changeSelect = (value) => {
        this.setState({ Installments: value });
        setTimeout(function(){
            this.validateInstallments();
        }.bind(this), 300);
    };

    generateInstallmentOptions() {
        var installmentOptions = [];
        for( var i=0; i < this.props.installments; ++i ) {

            var installmentsCount = i + 1;
            var text = installmentsCount + ' vezes de R$ ';

            if (installmentsCount == 1) {
                text = 'à vista por R$ '
            }

            installmentOptions.push({
                value: installmentsCount,
                label: text + this.priceForInstallmentsCount(installmentsCount)
            });
        }
        return installmentOptions;
    }

    expiry(expiryValue) {
        var expiry, expiryMaxLength;

        if (expiryValue === "") {
            return null;
        }
        else {
            expiry = expiryValue.toString();
            expiryMaxLength = 4;

            if (expiry.match(/\//)) {
                expiry = expiry.replace("/", "");
            }

            if (!expiry.match(/^[0-9]*$/)) {
                return null;
            }

            expiry = expiry.slice(0, 2) + "/" + expiry.slice(2, expiryMaxLength);
            return expiry;
        }
    }

    addFlipped = () => {
        if (this.state.flipped == 'flipped') {
            this.setState({
                flipped: ''
            });
        }
        else {
            if ( this.state.scheme != 'american express' ) {
                this.setState({
                    flipped: 'flipped'
                });
            }
        }
        this.validateCvv();
    };

    validateNumber = () => {
      if (!creditcard.validate(this.state.CardNumber)) {
          this.setState({
              errorCardNumber: 'error',
              textErrorCardNumber: 'Número de cartão inválido'
          });
          this.state.validateNumber = false;
      }
      else {
          this.setState({ errorCardNumber: 'success' });
          this.state.validateNumber = true;
      }

      if (this.state.CardNumber == '') {
          this.setState({
              errorCardNumber: 'error',
              textErrorCardNumber: 'Digite número do cartão'
          });
      }
    };

    validateName = () => {
        this.state.HolderName = this.state.HolderName || '';
        var verifyTwoPartsHolderName = this.state.HolderName.split(' ');

        if (this.state.HolderName != '' && verifyTwoPartsHolderName.length >= 2) {
            this.setState({ errorHolderName: 'success' });
            this.state.validateName = true;
        }
        else {
            this.setState({
                errorHolderName: 'error',
                textErrorHolderName: 'Digite corretamente nome do titular'
            });
            this.state.validateName = false;
        }
    };

    validateExpire = () => {
        var month = this.state.CCexpiry.split('/')[0];
        var year = '20' + this.state.CCexpiry.split('/')[1];

        if (creditcard.expiry(month, year)) {
            this.setState({ errorExpire: 'success' });
            this.state.validateExpire = true;
        }
        else {
            this.setState({
                errorExpire: 'error',
                textErrorExpire: 'Data de válidade errada'
            });
            this.state.validateExpire = false;
        }
    };

    validateInstallments() {
      if (this.props.installments) {
        if(this.state.Installments) {
            this.setState({
                errorInstallments: 'success'
            });
        }
        else {
            this.setState({
                errorInstallments: 'error',
                textErrorInstallments: 'Você precisa escolher as parcelas'
            });
        }
      }
      else {
        this.setState({Installments: true});
      }
    }

    validateCvv = () => {
        if ( this.state.parseCardNumber) {
            if (this.state.CvvNumber) {
              if (this.state.parseCardNumber.cvv === this.state.CvvNumber.length) {
                  this.setState({ errorCvvNumber: 'success' });
                  this.state.validateCvv = true;
              }
              else {
                  this.setState({
                      errorCvvNumber: 'error',
                      textErrorCvvNumber: 'Código de segurança incorreto'
                  });
                  this.state.validateCvv = false;
              }
            }
        }
        else {
            this.setState({
                errorCvvNumber: 'error',
                textErrorCvvNumber: 'Digite o código de segurança'
            });
            this.state.validateCvv = false;
        }
    };

    validateTermOfUse() {
        if (this.state.Terms) {
            this.setState({ errorTerms: 'success' });
        }
        else {
            this.setState({ errorTerms: 'error' });
        }
    }

    isNumber = (e) => {
      var charCode = (e.which) ? e.which : e.keyCode
      if (charCode > 31 && (charCode < 48 || charCode > 57)) {
        e.preventDefault();
      }
    };

    isString(e) {
        var charCode = (e.which) ? e.which : e.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57)) {
          return true;
        }

        e.preventDefault();
    }

    handleSubmit = (e) => {
        e.preventDefault();
        this.setState({ flipped: ''});

        if (
            this.state.validateNumber &&
            this.state.validateName &&
            this.state.validateExpire &&
            this.state.validateCvv &&
            this.state.Installments ) {

            let infoCreditCard = {
                HolderName: this.state.HolderName,
                CardNumber: (this.state.CardNumber).replace(/\s+/g, ''),
                CvvNumber: this.state.CvvNumber,
                ExpMonth: this.state.CCexpiry.split('/')[0],
                ExpYear: '20' + this.state.CCexpiry.split('/')[1],
                Installments: this.state.Installments
            }

            if (this.props.success) {
                this.props.success(infoCreditCard);
            }
        }
        else {
            this.validateCvv();
            this.validateExpire();
            this.validateName();
            this.validateNumber();
            this.validateInstallments();
            this.validateTermOfUse();
        }
    };

    priceForInstallmentsCount(installmentsCount) {
        var installmentValue = this.props.price / installmentsCount;
        return installmentValue.toFixed(3).slice(0,-1).replace(".", ",");
    }

    maxLengthCheck(object) {
      if (object.target.value.length > object.target.maxLength)
        object.target.value = object.target.value.slice(0, object.target.maxLength)
    }

    render() {
        var typeCard = classnames(this.state.scheme, this.state.flipped);
        var cvv = this.state.parseCardNumber ? this.state.parseCardNumber.cvv : 3;
        var installmentsContent = <div></div>;

        if (this.props.installments) {
          installmentsContent = <div className={classnames('grid large-100 small-100 medium-100 ds-payment-installments', this.state.errorInstallments)}>
              <Select
                  searchable={false}
                  placeholder={'Escolha número de parcelas'}
                  name="installments"
                  value={this.state.Installments}
                  options={this.generateInstallmentOptions()}
                  onChange={this.changeSelect} />
              <div className="error-message">
                  <b className="ds-payment-alert-ico">?
                      <b className="ds-payment-error-text">{this.state.textErrorInstallments}</b>
                  </b>
              </div>
          </div>
        }


        return (
            <div className="ds-payment">
              <CardUI
                      CardNumber={this.state.CardNumber}
                      HolderName={this.state.HolderName}
                      CCexpiry={this.state.CCexpiry}
                      CvvNumber={this.state.CvvNumber}
                      cardType={typeCard} />

              <form className="ds-payment-form">
                  <div className={classnames('grid large-100', this.state.errorCardNumber)}>
                      <input
                          placeholder="Número cartão"
                          type="text"
                          name="CardNumber"
                          value={this.state.CardNumber}
                          onChange={this.change}
                          onBlur={this.validateNumber} />
                      <div className="error-message">
                          <b className="ds-payment-alert-ico">?
                              <b className="ds-payment-error-text">{this.state.textErrorCardNumber}</b>
                          </b>
                      </div>
                  </div>

                  <div className={classnames('grid large-100', this.state.errorHolderName)}>
                      <input
                          placeholder="Nome (igual no cartão)"
                          value={this.state.HolderName}
                          type="text"
                          name="HolderName"
                          onKeyPress={this.isString}
                          onBlur={this.validateName}
                          onChange={this.change} />
                          <div className="error-message">
                              <b className="ds-payment-alert-ico">?
                                  <b className="ds-payment-error-text">{this.state.textErrorHolderName}</b>
                              </b>
                          </div>
                  </div>

                  <div className={classnames('grid large-60 medium-60 small-60', this.state.errorExpire)}>
                      <input
                          placeholder="Validade (MM/AA)"
                          type="text"
                          name="CCexpiry"
                          value={this.state.CCexpiry}
                          onBlur={this.validateExpire}
                          onKeyPress={this.isNumber}
                          onChange={this.change} />
                      <div className="error-message">
                          <b className="ds-payment-alert-ico">?
                              <b className="ds-payment-error-text">{this.state.textErrorExpire}</b>
                          </b>
                      </div>
                  </div>

                  <div className={classnames('grid large-40 medium-40 small-40', this.state.errorCvvNumber)}>
                      <input
                          placeholder="CVV"
                          type="text"
                          name="CvvNumber"
                          maxLength={cvv}
                          onBlur={this.addFlipped}
                          onKeyPress={this.isNumber}
                          onFocus={this.addFlipped}
                          onChange={this.change} />
                      <div className="error-message">
                          <b className="ds-payment-alert-ico">?
                              <b className="ds-payment-error-text">{this.state.textErrorCvvNumber}</b>
                          </b>
                      </div>
                  </div>

                  {installmentsContent}

                  <div className="grid large-100 medium-100 small-100">
                      <button type="submit" className="ds-payment-button" onClick={this.handleSubmit}>Pagar</button>
                  </div>
              </form>
              <style dangerouslySetInnerHTML={{__html: styles}}></style>
            </div>
        )
    }
}

export default CreditCard;
