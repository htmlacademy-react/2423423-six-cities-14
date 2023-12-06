import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import Host from '.';
import { offersMock } from '../../mock/offers';


describe('Component: Offer host', () => {
  it('should render correctly', () => {
    const expectedText = 'Meet the host';

    render(
      <Provider store={store}>
        <Router>
          <Host currentOffer={offersMock[0]} />
        </Router>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
