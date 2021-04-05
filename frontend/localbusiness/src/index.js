import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {BaseContextProvider} from './components/ContextProviders/BaseContextProvider';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
      <BaseContextProvider>
        <App />
      </BaseContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.register();
