import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';

import { offersMock } from '../../mock/offers';
import FavoriteList from './index';


describe('Component: Favorites', () => {
  it('should render correctly', () => {
    const expectedText = 'Saved listing';

    render(
      <Provider store={store}>
        <Router>
          <FavoriteList favoriteOffers={offersMock} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
