import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import { commentMock} from '../../mock/comments';
import OfferReview from '.';

describe('Component: Offer review', () => {
  it('should render correctly', () => {
    const expectedData = 'review';

    render(
      <Provider store={store}>
        <Router>
          <OfferReview item={commentMock} />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
