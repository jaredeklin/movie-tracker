import React from 'react';
import Loading from './Loading';
import { shallow } from 'enzyme';

describe('Loading', () => {
  it('should match the snapshot', () => {
    const wrapper = shallow(<Loading />);

    expect(wrapper).toMatchSnapshot();
  });
});