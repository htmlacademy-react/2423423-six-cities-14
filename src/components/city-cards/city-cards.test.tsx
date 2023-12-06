import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import CityCards from './index';
import { offersMock } from '../../mock/offers';


describe('Component: CityCards', () => {
  it('should render correctly', () => {
    const expectedData = 'city cards';

    render(
      <Provider store={store}>
        <Router>
          <CityCards offers={offersMock} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
