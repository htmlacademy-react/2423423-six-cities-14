import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { offerMock } from './mocks/offers';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <App offers={offerMock}/>
  </React.StrictMode>
);
