import React from 'react';
import {Grid, Button, Paper, Typography} from '@material-ui/core';

export default class MarkQuestionAnswer extends React.Component {


  handleCheck = (event) => {
    if (this.props.selected) {
      this.props.answerSelectedSave(this.props.answerIndex, false);
    } else {
      this.props.answerSelectedSave(this.props.answerIndex, true);
    }
  }

  render() {

    let buttonStyle = {};
    this.props.selected ? buttonStyle = {backgroundColor: 'orange'} : buttonStyle = {};

    let paperStyle;
    this.props.selected ? paperStyle = {backgroundColor: 'rgb(253,164,41,0.3)', padding: '10px'} : paperStyle = {backgroundColor: '#ECECEC', padding: '10px'};

    return(
      <Grid item style={{margin: '5px'}}>
        <Paper style={paperStyle}>
          <Typography>{this.props.answer}</Typography>
          { this.props.completed
            ? <Button disabled onClick={this.handleCheck} style={buttonStyle} variant="contained" color="primary" >Seleccionar</Button>
            : <Button onClick={this.handleCheck} style={buttonStyle} variant="contained" color="primary" >Seleccionar</Button>
          }
        </Paper>
      </Grid>
    )
  }


}
