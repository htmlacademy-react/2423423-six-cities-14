import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import Tabs from '.';


describe('Component: Tabs', () => {
  it('should render correctly', () => {
    const expectedText = 'tabs';

    render(
      <Provider store={store}>
        <Router>
          <Tabs />
        </Router>
      </Provider>
    );

    expect(screen.getByTestId(expectedText)).toBeInTheDocument();
  });
});
