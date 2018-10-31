import React from 'react';
import { SignUp, mapDispatchToProps } from './SignUp';
import { shallow } from 'enzyme';

describe('SignUp', () => {
  let wrapper;
  const mockLogInUser = jest.fn();
  const mockHistory = { push: jest.fn() };
  const mockUserData = {
    name: 'Matt',
    password: 'yolo',
    email: 'test@test.com'
  };

  beforeEach(() => {
    wrapper = shallow(<SignUp logInUser={mockLogInUser} history={mockHistory} />);
  });

  it('should match the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleFetch', () => {
    it('should call logInUser if response is ok and redirect', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: true,
        json: () => Promise.resolve({
          name: 'Matt',
          id: 3
        })
      }));
  
      await wrapper.instance().handleFetch(mockUserData);
      expect(mockLogInUser).toHaveBeenCalledWith(3, 'Matt');
      expect(mockHistory.push).toHaveBeenCalledWith('/');
    });
  
    it('should signUpError state to true if response is bad', async () => {
      window.fetch = jest.fn().mockImplementation(() => Promise.resolve({
        ok: false,
        statusText: 'Not Found'
      }));
  
      expect(wrapper.state('signUpError')).toEqual(false);
      await wrapper.instance().handleFetch(mockUserData);
      expect(wrapper.state('signUpError')).toEqual(true);
    });
  });

  describe('handleChange', () => {
    it('should update name, email and password when input changes', () => {
      const mailEvent = { 
        target: { 
          value: 'terminator@dude.com', 
          name: 'email' 
        } 
      };
  
      const nameEvent = { 
        target: { 
          value: 'Arnie', 
          name: 'name' 
        } 
      };
  
      const passwordEvent = { 
        target: { 
          value: 'doomsday', 
          name: 'password' 
        } 
      };
     
      wrapper.find('#name').simulate('change', nameEvent);
      expect(wrapper.state('name')).toEqual('Arnie');
  
      wrapper.find('#email').simulate('change', mailEvent);
      expect(wrapper.state('email')).toEqual('terminator@dude.com');
  
      wrapper.find('#password').simulate('change', passwordEvent);
      expect(wrapper.state('password')).toEqual('doomsday');
    });  
  });

  describe('handleSubmit', () => {
    it('should invoke handleFetch when handleSubmit is called', () => {
      const mockEvent = { preventDefault: jest.fn() };
      const mockInfo = {
        name: 'Bob',
        email: 'bobbafetch@dude.com',
        password: 'boobbafette'
      };
  
      wrapper.instance().handleFetch = jest.fn();
      const spy = jest.spyOn(wrapper.instance(), 'handleFetch');
  
      wrapper.setState({
        name: 'Bob',
        email: 'bobbafetch@dude.com',
        password: 'boobbafette'
      });
  
      wrapper.instance().handleSubmit(mockEvent);
      expect(spy).toHaveBeenCalledWith(mockInfo);
    });
  
    it('should reset state to empty when handleSubmit is called', async () => {
  
      const mockEvent = { preventDefault: jest.fn() };
      wrapper.setState({
        name: 'Matt', 
        password: 'sploosh', 
        email: 'ohmama@zguy.com'
      });
  
      const expected = {
        name: '',
        email: '',
        password: '',
        signUpError: false
      };
      wrapper.instance().handleFetch = jest.fn();
  
      await wrapper.instance().handleSubmit(mockEvent);
      expect(wrapper.state()).toEqual(expected);
    });
  });

  it('should dispatch to the store correctly', () => {
    const mockDispatch = jest.fn();
    const mapped = mapDispatchToProps(mockDispatch);

    mapped.logInUser();
    expect(mockDispatch).toHaveBeenCalled();
  });
});