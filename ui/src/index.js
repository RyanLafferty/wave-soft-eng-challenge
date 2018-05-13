import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom';
import { PayrollStore } from './reducers/Reducers';
import { createMuiTheme, MuiThemeProvider } from 'material-ui/styles';
import 'normalize.css';

import Home from './screens/Home';
import registerServiceWorker from './registerServiceWorker';

const theme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      light: '#12D8DF',
      main: '#12D8DF',
      dark: '#12D8DF',
    },
    secondary: {
      light: '#0A7D90',
      main: '#0A7D90',
      dark: '#0A7D90',
    },
  },
});


ReactDOM.render(
  <HashRouter>
    <Provider store={PayrollStore}>
    <MuiThemeProvider theme={theme}>
      <Home/>
    </MuiThemeProvider>
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);
registerServiceWorker();