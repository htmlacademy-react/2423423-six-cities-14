import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import HeaderNoAuth from '.';


describe('Component: Header no-auth', () => {
  it('should render correctly', () => {
    const expectedText = 'Sign in';

    render(
      <Provider store={store}>
        <Router>
          <HeaderNoAuth />
        </Router>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
