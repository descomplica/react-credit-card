'use strict'

import React, { Component, PropTypes } from 'react';
import Select from 'react-select';
import creditcard from 'creditcard';
import classnames from 'classnames';
import styles from '../styles/creditcard.scss';

var creditCard = React.createClass({
    getInitialState: function() {
        return {
            errors: '',
            Terms: false,
            isBuying: true,
            CardNumber : '',
            CCexpiry : '',
            CvvNumber : '•••',
            scheme: '',
            flipped: '',
            loading: false,
            Installments: null
        }
    },

    retry: function() {
        this.setState({ failedPayment: false, isBuying: true });
    },

    change: function(name, e) {
        var value = {};
        value[name] = e.target.value;

        if ( name == 'CardNumber' ) {
            value.parseCardNumber = creditcard.parse(e.target.value);
            value[name] = value.parseCardNumber.formatted;
            value.scheme = value.parseCardNumber.scheme ? value.parseCardNumber.scheme.toLowerCase() : '';
        };

        if ( name == 'ClickTerms' ) {
            if ( this.state.Terms ) {
                this.state.Terms = false
            }
            else {
                this.state.Terms = true
            }
            this.validateTermOfUse();
        };

        if ( name == 'CCexpiry') {
            value.CCexpiry = this.expiry(e.target.value);
        };

        this.setState(value);
    },

    changeSelect: function(value) {
        this.setState({ Installments: value });
        setTimeout(function(){
            this.validateInstallments();
        }.bind(this), 300);
    },

    generateInstallmentOptions: function() {
        var installmentOptions = [];
        for( var i=0; i < this.props.maxinstallments; ++i ) {
            
            var installmentsCount = i + 1;
            var text = installmentsCount + ' vezes de R$ ';

            if (installmentsCount == 1) {
                text = 'à vista por R$ '
            };

            installmentOptions.push({
                value: installmentsCount,
                label: text + this.priceForInstallmentsCount(installmentsCount)
            });
        }
        return installmentOptions;
    },

    expiry: function(expiryValue) {
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
    },

    addFlipped: function() {
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
    },

    validateNumber: function () {
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
    },

    validateName: function () {
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
    },

    validateExpire: function() {
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
    },

    validateInstallments: function() {
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
    },

    validateCvv: function() {
        if ( this.state.parseCardNumber ) {
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
        else {
            this.setState({ 
                errorCvvNumber: 'error',
                textErrorCvvNumber: 'Digite o código de segurança'
            });
            this.state.validateCvv = false;
        }
    },

    validateTermOfUse: function() {
        if (this.state.Terms) {
            this.setState({ errorTerms: 'success' });
        }
        else {
            this.setState({ errorTerms: 'error' });
        }
    },

    isNumber: function(evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        return false;

        return true;
    },

    isString: function(evt){
        var charCode = (evt.which) ? evt.which : event.keyCode
        if (charCode > 31 && (charCode < 48 || charCode > 57))
        return true;

        return false;
    },

    validateForms : function() {
        if ( 
            this.state.validateNumber && 
            this.state.validateName && 
            this.state.validateExpire && 
            this.state.validateCvv &&
            this.state.Installments &&
            this.state.Terms ) {

            this.postPurchase({
                HolderName: this.state.HolderName,
                CardNumber: (this.state.CardNumber).replace(/\s+/g, ''),
                CvvNumber: this.state.CvvNumber,
                ExpMonth: this.state.CCexpiry.split('/')[0],
                ExpYear: '20' + this.state.CCexpiry.split('/')[1],
                PlanId : this.props.planid,
                Installments : this.state.Installments,
                promocode: this.props.promocode
            });
        }
        else {
            this.validateCvv();
            this.validateExpire();
            this.validateName();
            this.validateNumber();
            this.validateInstallments();
            this.validateTermOfUse();
        }
    },

    postPurchase: function(data) {
        this.setState({ loading: true, isBuying: false });

        $.ajax({
            type: 'POST',
            url: this.props.endpointurl,
            data: data,
            crossDomain: true,
            success: this.validateResponse,
            error: this.connectionError,
            xhrFields: {
              withCredentials: true
            }
        });
    },

    handleSubmit: function(e){
        e.preventDefault();
        this.validateForms();
    },

    connectionError: function() {
        //
    },

    validateResponse: function(response) {
        if (response.Status) {
            this.setState({
                productName: this.props.planname,
                successPayment: true,
                loading: false
            });

            setTimeout(function(){
                location.reload();
            }, 6500);
        }
        else {
            var erros = [];
            for (var i = 0; i < response.Values.length; i++) {
              var values = response.Values[i];
              for (var j = 0; j < values.Errors.length; j++) {
                erros.push(values.Errors[j].ErrorMessage);
              }
            }

            this.setState({
                productName: this.props.planname,
                successPayment: false,
                failedPayment: true,
                paymentsResponseErros: erros,
                loading: false
            });
        }
    },

    priceForInstallmentsCount: function(installmentsCount) {
        var installmentValue = this.props.fullprice / installmentsCount;
        return installmentValue.toFixed(3).slice(0,-1).replace(".", ",");
    },

    formatMoney: function(value, c, d, t) {
        var n = value,
            c = isNaN(c = Math.abs(c)) ? 2 : c, 
            d = d === undefined ? "," : d, 
            t = t === undefined ? "." : t, 
            s = n < 0 ? "-" : "", 
            i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "", 
            j = (j = i.length) > 3 ? j % 3 : 0;
       return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
     },

    render: function () {
        var typeCard = classnames(this.state.scheme, this.state.flipped);
        var checked = classnames('ds-component-check-box', this.state.Terms ? 'checked' : '');
        var cvv = this.state.parseCardNumber ? this.state.parseCardNumber.cvv : 3;
        var content = <div></div>;

        var formatedPrice = this.formatMoney(this.props.fullprice, 2, ',', '.');

        if(this.state.isBuying) {
            content = 
            <div>
                <Card 
                        CardNumber={this.state.CardNumber}
                        HolderName={this.state.HolderName}
                        CCexpiry={this.state.CCexpiry}
                        CvvNumber={this.state.CvvNumber}
                        cardType={typeCard} />

                <form onSubmit={this.handleSubmit} className="ds-payment-form">
                    <div className={classnames('grid large-100', this.state.errorCardNumber)}>
                        <input 
                            placeholder="Número cartão" 
                            type="text" 
                            name="CardNumber" 
                            value={this.state.CardNumber} 
                            onChange={this.change.bind(this, 'CardNumber')} 
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
                            onChange={this.change.bind(this, 'HolderName')} />
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
                            onChange={this.change.bind(this, 'CCexpiry')} />
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
                            onChange={this.change.bind(this, 'CvvNumber')} />
                        <div className="error-message">
                            <b className="ds-payment-alert-ico">?
                                <b className="ds-payment-error-text">{this.state.textErrorCvvNumber}</b>
                            </b>
                        </div>
                    </div>
                    
                    <div className={classnames('grid large-100 ds-payment-installments', this.state.errorInstallments)}>
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

                    <div className={classnames('grid large-100 terms-of-use', this.state.errorTerms)}>
                        <div className="ds-component-container-checkbox" onClick={this.change.bind(this, 'ClickTerms')}>
                            <label htmlFor="Terms" className={checked}></label>
                            <b>&nbsp; Eu aceito os termos de uso </b>
                        </div>
                    </div>

                    <div className="grid large-100">
                        <button type="submit" className="ds-payment-button">  Pagar </button>
                    </div>
                </form>
            </div>
        }
        else if (this.state.loading) {
            content = <Loading />
        }
        else if(this.state.successPayment){
            content = <Success />
        }
        else if(this.state.failedPayment){
            content = <Failed />
        }

        return (
            <div className="ds-payment">
                {content}
                <style dangerouslySetInnerHTML={{__html: styles}}></style>
            </div>
        )
    }
});

var Card = React.createClass({
    render: function() {
        return (
            <div className="ds-payment-card-container">
                <div className={'ds-payment-card ' + this.props.cardType}>
                    <div className="ds-payment-card-front">
                        <div className="ds-payment-card-lower">
                            <div className="ds-payment-flags"></div>
                            <div className="ds-payment-card-number ds-payment-card-display">{this.props.CardNumber ? this.props.CardNumber : '•••• •••• •••• ••••'}</div>
                            <div className="ds-payment-card-name ds-payment-card-display">{this.props.HolderName ? this.props.HolderName : 'NOME COMPLETO'}</div>
                            <div className="ds-payment-card-expireCVV ds-payment-card-display">{this.props.CvvNumber}</div>
                            <div className="ds-payment-card-expiry ds-payment-card-display">
                                <b>Válido até</b>
                                {this.props.CCexpiry ? this.props.CCexpiry : 'MM/AA'}
                            </div>
                        </div>
                    </div>
                    <div className="ds-payment-card-back">
                        <div className="ds-payment-card-bar">
                        </div>
                        <div className="bar-withe"></div>
                        <div className="ds-payment-card-cvc ds-payment-card-display">{this.props.CvvNumber}</div>
                        <div className="ds-payment-card-shiny"></div>
                    </div>
                </div>
            </div>
        )
    }
});

var Success = React.createClass({
    render: function() {
        return ( 
            <div className="ds-payment-success">
                <h1>Pagamento efetuado com sucesso!</h1>
            </div>
        );
    }
});

var Failed = React.createClass({
    render: function() {
        return ( 
            <div className="ds-payment-failed">
                <h1>Erro ao processar pagamento</h1>
            </div>
        );
    }
});

var Loading = React.createClass({
    render: function() {
        return (
            <span className="ds-payment-loading">
                <h1>Processando...</h1>
            </span>
        )
    }
});


module.exports = creditCard;
