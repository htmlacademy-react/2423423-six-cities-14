import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import OfferSorting from '.';

describe('Component: Offer sorting', () => {
  it('should render correctly', () => {
    const expectedData = 'offer sort';

    render(
      <Provider store={store}>
        <Router>
          <OfferSorting/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
