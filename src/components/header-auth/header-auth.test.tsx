import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import HeaderAuth from '.';


describe('Component: Header auth', () => {
  it('should render correctly', () => {
    const expectedData = 'auth';

    render(
      <Provider store={store}>
        <Router>
          <HeaderAuth />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
