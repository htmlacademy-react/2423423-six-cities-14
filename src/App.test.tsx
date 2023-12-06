import {render, waitFor, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import App from './App';
import { store } from './store';

describe('Application Routing', () => {

  it('should render page "Main" when user navigates to "/"', () => {
    const expectData = 'main';
    const expectedText = 'Cities';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectData)).toBeInTheDocument();
      expect(screen.getByText(expectedText)).toBeInTheDocument();
    });
  });

  it('should render page "Favorites" when user navigates to "/favorites"', () => {
    const expectData = 'favorites';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectData)).toBeInTheDocument();
    });
  });

  it('should render page "Login" when user navigates to "/login"', () => {
    const expectText = 'Sign in';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render page "Offer" when user navigates to "/offer"', () => {
    const expectText = 'What &prime s inside';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });

  it('should render page "NotFound" when user navigates to "/error"', () => {
    const expectText = '404';

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    waitFor(() => {
      expect(screen.getByTestId(expectText)).toBeInTheDocument();
    });
  });
});
