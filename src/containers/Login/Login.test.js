import React from 'react';
import { shallow } from 'enzyme';
import { Login, mapStateToProps, mapDispatchToProps } from './Login';
import { loadAllFavorites } from '../../cleaners/loadAllFavorites.js';
import { mocklogInData } from '../../cleaners/mockData';

jest.mock('../../cleaners/loadAllFavorites');

describe('Login', () => {
  let wrapper, 
    mockHandleSubmit, 
    mockEvent, 
    mockHistory,
    mockAddAllFavorites;

  beforeEach(() => {
    mockHandleSubmit = jest.fn();
    mockEvent = {
      preventDefault: jest.fn()
    };

    mockHistory = { push: jest.fn() };
    mockAddAllFavorites = jest.fn();
    wrapper = shallow(<Login 
      handleSubmit={mockHandleSubmit}
      history={mockHistory} 
      addAllFavorites={mockAddAllFavorites} />
    );
  });

  it('should match the snapshot', ()=> {
    expect(wrapper).toMatchSnapshot();
  });

  it('should invoke logIn with correct params on submitEmail', () => {
    const expected = {
      email: '',
      password: ''
    };

    wrapper.instance().logIn = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'logIn');

    wrapper.instance().submitEmail(mockEvent);
    expect(spy).toHaveBeenCalledWith(expected);
  });

  it('should call redirectUser with correct params', async () => {
    const mockData = {
      email: 'tman2272@aol.com',
      password: 'password'
    };

    wrapper.instance().redirectUser = jest.fn();
    const spy = jest.spyOn(wrapper.instance(), 'redirectUser');

    window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mocklogInData)
    }));

    await wrapper.instance().logIn(mockData);
    expect(spy).toHaveBeenCalledWith(1, 'Taylor');
  });

  it('should fetch favorites from db and put them into the store', async () => {
    
    await wrapper.instance().showFavorites();
    expect(mockAddAllFavorites).toHaveBeenCalled();
  });

  it('should loadAllFavorites when showFavorites is called', () => {
    const id ='666';

    wrapper.instance().showFavorites(id);
    expect(loadAllFavorites).toHaveBeenCalledWith(id);
  });

  it('should call handleSubmit when redirectUser is called', () => {
    const id = '122345';
    const name = 'jared';

    wrapper.instance().redirectUser(id, name);
    expect(mockHandleSubmit).toHaveBeenCalledWith(id, name);
  });

  it('should set state error to true in case of bad response', async () => {
    const mockData = {
      email: 'tman@gmail.com',
      password: 'blobs'
    };

    window.fetch = jest.fn().mockImplementation(() => Promise.reject({
      status: 500
    }));

    await wrapper.instance().logIn(mockData);
    expect(wrapper.state('error')).toEqual(true);
  });

  it('should set state of email and password when input changes', () => {
    const event1 = { target: { value: 'tman@gmail.com' } };

    wrapper.find('#email').simulate('change', event1);
    expect(wrapper.state('email')).toEqual('tman@gmail.com');

    const event2 = { target: { value: 'dayman' } };

    wrapper.find('#password').simulate('change', event2);
    expect(wrapper.state('password')).toEqual('dayman');
  });

  it('should map to the store correctly', () => {
    const mockStore = { user: {name: 'Jared'} };

    const mapped = mapStateToProps(mockStore);
    expect(mapped.user).toEqual(mockStore.user);
  });

  it('should dispatch to the store correctly', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.handleSubmit();
    expect(mockDispatch).toHaveBeenCalled();
  });

});