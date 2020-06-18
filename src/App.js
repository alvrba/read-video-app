import React from 'react';
import {connect} from 'react-redux';


import Video from './Video';


class App extends React.Component {


  render() {
    return(

        <Video dispatch={this.props.dispatch} url={this.props.url} marks={this.props.marks} />

    )
  }

}

function mapStateToProps(state) {
  return {
    ...state
  };
}

export default connect(mapStateToProps)(App);
