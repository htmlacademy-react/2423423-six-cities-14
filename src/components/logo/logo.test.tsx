import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import Logo from '.';


describe('Component: Logo', () => {
  it('should render correctly', () => {
    const expectedData = 'logo';

    render(
      <Provider store={store}>
        <Router>
          <Logo />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedData)).toBeInTheDocument();
  });
});
