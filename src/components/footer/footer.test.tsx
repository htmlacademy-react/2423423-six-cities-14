import {render, screen} from '@testing-library/react';
import Footer from '.';


describe('Component:EmptyFavoriteCards', () => {
  it('should render correctly',() => {
    const expectedData = 'footer';

    render(<Footer />);

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
