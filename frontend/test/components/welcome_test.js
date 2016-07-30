import { renderComponent, expect } from '../test_helper';
import Welcome from '../../src/components/welcome';

describe('Welcome', () => {

  it('has the correct class name', () => {

    const component = renderComponent(Welcome);

    expect(component).to.contain('Welcome to suPerCooL search');
  });
});