import React from 'react';
import {Provider} from 'react-redux';
import {createStore} from 'redux';
import GlobalState from './reducers';
import {initialEmptyState} from '../initialEmptyState';

import {ThemeProvider} from '@material-ui/core/styles';
import {theme} from '../theme/theme';


import App from '../App';


export default class ReduxProvider extends React.Component {
  constructor(props) {
    super(props);
    if (window.initialState) {
        const initial = window.initialState;
        this.initialState = {
          ...initial
        };
      }

    this.store = this.configureStore();
  }

  render() {
    return(
      <Provider store={this.store} >
        <ThemeProvider theme={theme}>
          <App store={this.store} />
        </ThemeProvider>
      </Provider>
    );
  }


  configureStore() {
    return createStore(GlobalState, this.initialState);
  }
}
