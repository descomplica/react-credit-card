'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';

import CreditCard from '@components/creditCard';

describe('Form', () => {
  let card;
  let inputs;

  beforeEach(() => {
    card = TestUtils.renderIntoDocument(
      <CreditCard />
    );
    inputs = TestUtils.scryRenderedDOMComponentsWithTag(card, 'input');
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
      var button = TestUtils.scryRenderedDOMComponentsWithTag(card, 'button');
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
});
