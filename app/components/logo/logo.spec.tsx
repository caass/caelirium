import React from 'react';
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CloudSnow } from 'react-feather';
import { shell } from 'electron';
import Logo from './index';

Enzyme.configure({ adapter: new Adapter() });

jest.mock('electron', () => ({
  shell: {
    openExternal: jest.fn()
  }
}));

const getComponent = () => mount(<Logo size={48} />);

describe('Logo component displays correctly', () => {
  it('should render the logo', () => {
    const logo = getComponent();
    expect(logo.children()).toHaveLength(1);

    const icon = logo.childAt(0);
    expect(icon.type()).toBe(CloudSnow);
  });

  it('has some kind of transition', () => {
    const logo = getComponent();
    expect(logo.render().hasClass('transition')).toBeTruthy();
  });
});

describe('Logo button works', () => {
  it('should open homepage on click', () => {
    const logo = getComponent();
    logo.simulate('click');
    expect(shell.openExternal).toHaveBeenCalled();
  });

  it('should open homepage on enter press', () => {
    const logo = getComponent();

    logo.simulate('keydown', { key: 'Enter' });
    logo.simulate('keydown', { key: 'Alt' });

    expect(shell.openExternal).toHaveBeenCalledTimes(2);
  });
});
