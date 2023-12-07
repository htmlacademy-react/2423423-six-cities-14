import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import { offersMock } from '../../mock/offers';
import OfferImage from '.';


describe('Component: Offer host', () => {
  it('should render correctly', () => {
    const expectedData = 'offer image';

    render(
      <Provider store={store}>
        <Router>
          <OfferImage image={offersMock[0].images[0]}/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
