import {render, screen} from '@testing-library/react';
import FavoritesEmpty from '.';


describe('Component:EmptyFavoriteCards', () => {
  it('should render correctly',() => {
    const expectedText = /Nothing yet saved/i;

    render(<FavoritesEmpty />);

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
