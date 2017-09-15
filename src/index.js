import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Page from './page';
import registerServiceWorker from './registerServiceWorker';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const App = () => (
    <MuiThemeProvider>
      <Page />
    </MuiThemeProvider>
  );

ReactDOM.render(<App />, document.getElementById('root'));
