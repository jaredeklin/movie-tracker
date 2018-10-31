import React from 'react';
import { Home } from './Home';
import { mockCleanNowPlaying, mockFavorites } from '../../cleaners/mockData';
import { shallow } from 'enzyme';


describe('Home', () => {

  it('should match the snapshot', () => {

    let wrapper = shallow(<Home 
      movies={mockCleanNowPlaying} 
      favorites={mockFavorites} />);

    expect(wrapper).toMatchSnapshot();
  });

});