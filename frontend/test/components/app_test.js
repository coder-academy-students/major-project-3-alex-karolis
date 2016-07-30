import { renderComponent, expect } from '../test_helper';
import App from '../../src/components/app';

describe('App', () => {

  it('has the correct class name', () => {

    const component = renderComponent(App);

    expect(component).to.have.class('wrapper');
  });
});
