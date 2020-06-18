import React from 'react';
import {checkTest} from './redux/actions';
import {Grid, Button, Paper, Typography} from '@material-ui/core';

export default class MarkTest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: -1,
    }
  }

  handleTrue = (event) => {
    this.setState({selected: true});
  }

  handleFalse = (event) => {
    this.setState({selected: false});
  }

  handleCheck = (event) => {
    this.props.dispatch(checkTest(this.props.index, this.state.selected));
    this.setState({selected: -1});
  }

  render() {

    let buttonStyleTrue = {backgroundColor: 'grey'};
    let buttonStyleFalse = {backgroundColor: 'grey'};

    if (this.state.selected === true) {
      buttonStyleTrue = {backgroundColor: 'orange'};
      buttonStyleFalse = {backgroundColor: 'grey'};
    } else if (this.state.selected === false) {
      buttonStyleTrue = {backgroundColor: 'grey'};
      buttonStyleFalse = {backgroundColor: 'orange'};
    }

    let resultStyle;
    let resultStyleButton;
    let resultText;
    if (this.props.mark.content.correct) {
      resultStyle = {backgroundColor: 'rgb(15,127,18,0.3)', paddingBottom: '20px'};
      resultStyleButton = {backgroundColor: 'rgb(15,127,18)', padding: '4px'};
      resultText = "CORRECTO";
    } else {
      resultStyle = {backgroundColor: 'rgb(252,13,27,0.3)', paddingBottom: '20px'};
      resultStyleButton = {backgroundColor: 'rgb(252,13,27)', padding: '4px'};
      resultText = "INCORRECTO";
    }

    if (this.props.mark.content.completed === false) {
      return(
        <Grid container spacing={2} style={{paddingBottom: '20px'}} >

          <Grid item >
            <Paper style={{padding: '4px', backgroundColor: 'orange'}}>
              <Typography style={{fontSize: '12px', color: 'white'}} >{this.props.mark.type}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} >
            <Typography >{this.props.mark.content.question}</Typography>
          </Grid>

          <Grid container justify="center" >
            <Grid item style={{margin: '5px'}} >
              <Button onClick={this.handleTrue} style={buttonStyleTrue} variant="contained" color="primary" >Verdadero</Button>
            </Grid>
            <Grid item style={{margin: '5px'}} >
              <Button onClick={this.handleFalse} style={buttonStyleFalse} variant="contained" color="primary" >Falso</Button>
            </Grid>
          </Grid>

          <Grid container justify="center" style={{margin: '5px'}} >
            <Grid item >
            { this.state.selected !== -1
              ? <Button onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
              : <Button disabled onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
            }
            </Grid>
          </Grid>

        </Grid>
      )
    } else {
      return(
        <Grid container spacing={2} style={resultStyle} >

          <Grid item xs={12} >
            <Grid container justify="flex-start" spacing={1} >
              <Grid item >
                <Paper style={{padding: '4px', backgroundColor: 'orange'}}>
                  <Typography style={{fontSize: '12px', color: 'white'}} >{this.props.mark.type}</Typography>
                </Paper>
              </Grid>
              <Grid item >
                <Paper style={resultStyleButton}>
                  <Typography style={{fontSize: '12px', color: 'white'}} >{resultText}</Typography>
                </Paper>
              </Grid>
            </Grid>
          </Grid>


          <Grid item xs={12} >
            <Typography >{this.props.mark.content.question}</Typography>
          </Grid>

          <Grid container justify="center" >
            <Grid item style={{margin: '5px'}} >
              <Button disabled onClick={this.handleTrue} style={buttonStyleTrue} variant="contained" color="primary" >Verdadero</Button>
            </Grid>
            <Grid item style={{margin: '5px'}} >
              <Button disabled onClick={this.handleFalse} style={buttonStyleFalse} variant="contained" color="primary" >Falso</Button>
            </Grid>
          </Grid>

          <Grid container justify="center" style={{margin: '5px'}} >
            <Grid item >
            { this.state.selected !== -1
              ? <Button onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
              : <Button disabled onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
            }
            </Grid>
          </Grid>

          <Grid item xs={12} >
            <Paper style={{backgroundColor: '#ECECEC', padding: '10px'}} >
              <Typography >JUSTIFICACIÓN</Typography>
              <Typography >{this.props.mark.content.reason}</Typography>
            </Paper>
          </Grid>

        </Grid>


      )
    }
  }


}
