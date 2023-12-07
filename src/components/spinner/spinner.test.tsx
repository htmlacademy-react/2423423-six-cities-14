import {render, screen} from '@testing-library/react';
import Spinner from '.';


describe('Component: Spinner', () => {
  it('should render correctly',() => {
    const expectedText = 'spinner';

    render(<Spinner/>);

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});

