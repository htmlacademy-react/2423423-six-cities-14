import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { store } from '../../store';
import UserNav from '.';

describe('Component: User nav', () => {
  it('should render correctly', () => {
    const expectedData = 'user navigation';

    render(
      <Provider store={store}>
        <Router>
          <UserNav />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
