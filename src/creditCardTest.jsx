'use strict';

import expect from 'unexpected';
import React from 'react';
import TestUtils from 'react-addons-test-utils';

import creditCard from '@components/creditCard';

const shallowRenderer = TestUtils.createRenderer();

describe('Your Component Test Case', () => {

  it('should render', () => {
    shallowRenderer.render(<creditCard />);
    expect(shallowRenderer.getRenderOutput(), 'to be defined');
  });

});
