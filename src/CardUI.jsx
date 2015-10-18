'use strict'

import React, { Component, PropTypes } from 'react';

class CardUI extends React.Component {
    render() {
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
};

export default CardUI;
