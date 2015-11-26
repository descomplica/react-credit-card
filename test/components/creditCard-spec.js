'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CreditCard from '../../src/creditCard';

describe('Form', () => {
  let card;
  let inputs;
  let button;

  beforeEach(() => {
    card = TestUtils.renderIntoDocument(
      <CreditCard />
    );
    inputs = TestUtils.scryRenderedDOMComponentsWithTag(card, 'input');
    button = TestUtils.scryRenderedDOMComponentsWithTag(card, 'button');
  });

  describe('render correct classname', () => {
    it('should components has class "ds-payment"',  () => {
      expect(ReactDOM.findDOMNode(card).className).toMatch('ds-payment');
    });

    it('should form has class "ds-payment-form"',  () => {
      let form = TestUtils.scryRenderedDOMComponentsWithTag(card, 'form');
      expect(ReactDOM.findDOMNode(form[0]).className).toMatch('ds-payment-form');
    });
  });

  describe('inputs have placeholder', () => {
    it('number', () => {
      expect(ReactDOM.findDOMNode(inputs[0]).placeholder).toBe('Número cartão');
    });

    it('name', () => {
      expect(ReactDOM.findDOMNode(inputs[1]).placeholder).toBe('Nome (igual no cartão)');
    });

    it('expire', () => {
      expect(ReactDOM.findDOMNode(inputs[2]).placeholder).toBe('Validade (MM/AA)');
    });

    it('cvv', () => {
      expect(ReactDOM.findDOMNode(inputs[3]).placeholder).toBe('CVV');
    });
  });

  describe('inputs have corrent name', () => {
    it('number', () => {
      expect(ReactDOM.findDOMNode(inputs[0]).name).toBe('CardNumber');
    });

    it('name', () => {
      expect(ReactDOM.findDOMNode(inputs[1]).name).toBe('HolderName');
    });

    it('expire', () => {
      expect(ReactDOM.findDOMNode(inputs[2]).name).toBe('CCexpiry');
    });

    it('cvv', () => {
      expect(ReactDOM.findDOMNode(inputs[3]).name).toBe('CvvNumber');
    });
  });

  describe('render button', () => {
    it('button type has submit', () => {
      expect(ReactDOM.findDOMNode(button[0]).type).toBe('submit');
    });

    it('button have class "ds-payment-button"', () => {
      var button = TestUtils.scryRenderedDOMComponentsWithTag(card, 'button');
      expect(ReactDOM.findDOMNode(button[0]).className).toMatch('ds-payment-button');
    });
  });

  describe('initial state', () => {
    it('isBuying defined to true', () => {
      expect(card.state.isBuying).toBe(true);
    });

    it('CCexpiry defined to string', () => {
      expect(card.state.CCexpiry).toBe('');
    });

    it('scheme defined to null', () => {
      expect(card.state.scheme).toBe(null);
    });
  });

  describe('default props', () => {
    it('installments equal null', () => {
      expect(card.props.installments).toBe(null);
    });
  });

  describe('validation credit card', () => {
    it('invalid number', () => {
      card.state.CardNumber = '2323 2322 2323 3223';
      TestUtils.Simulate.click(ReactDOM.findDOMNode(button[0]));

      expect(card.state.errorCardNumber).toBe('error');
      expect(card.state.textErrorCardNumber).toBe('Número de cartão inválido');
      expect(card.state.validateNumber).toBe(false);
    });

    it('valid number', () => {
      card.state.CardNumber = '4111 1111 1111 1111';
      TestUtils.Simulate.click(ReactDOM.findDOMNode(button[0]));
      expect(card.state.errorCardNumber).toBe('success');
      expect(card.state.validateNumber).toBe(true);
    });

    it('only number', () => {
      card.state.CardNumber = 'only number';
      TestUtils.Simulate.change(ReactDOM.findDOMNode(inputs[0]));
      expect(card.state.CardNumber).toBe('');
    });
  });
});
