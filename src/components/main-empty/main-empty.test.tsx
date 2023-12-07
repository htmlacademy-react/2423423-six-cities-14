import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';
import {store} from '../../store';
import { MainEmpty } from '.';
import { locationsMock } from '../../mock/location';


describe('Component: Main empty', () => {
  it('should render correctly', () => {
    const expectedText = 'No places to stay available';

    render(
      <Provider store={store}>
        <Router>
          <MainEmpty location={locationsMock[0]}/>
        </Router>
      </Provider>
    );

    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
