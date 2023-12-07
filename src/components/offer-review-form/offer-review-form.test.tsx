import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import ReviewForm from '.';
import { offersMock } from '../../mock/offers';


describe('Component: Review form', () => {
  it('should render correctly', () => {
    const expectedData = 'review form';

    render(
      <Provider store={store}>
        <Router>
          <ReviewForm id={offersMock[0].id}/>
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
