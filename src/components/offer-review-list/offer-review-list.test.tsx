import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import { offersMock } from '../../mock/offers';
import OfferReviewList from '.';
import { mockComments } from '../../mock/comments';

describe('Component: Review list', () => {
  it('should render correctly', () => {
    const expectedData = 'review list';

    render(
      <Provider store={store}>
        <Router>
          <OfferReviewList comments={mockComments} id={offersMock[0].id} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
