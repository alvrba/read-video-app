import React from 'react';
import {checkQuestion} from './redux/actions';
import {Grid, Button, Paper, Typography} from '@material-ui/core';

import MarkQuestionAnswer from './MarkQuestionAnswer';


export default class MarkQuestion extends React.Component {
  constructor(props) {
    super(props)
    let initialSelected = new Array(this.props.mark.content.answers.length);
    initialSelected.fill(false, 0, initialSelected.length);
    this.state = {
      selected: initialSelected
    }
  }

  handleCheck = (event) => {
    this.props.dispatch(checkQuestion(this.props.index, this.state.selected));
    this.setState({selected: []});
  }

  answerSelectedSave = (answerIndex, selected) => {
    let newSelected = this.state.selected.slice();
    newSelected[answerIndex] = selected;

    this.setState({selected: newSelected});
  }

  render() {

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

          <Grid item xs={12}>
          {
            this.props.mark.content.answers.map((answer, answerIndex) => {
              return <MarkQuestionAnswer key={answerIndex} answerIndex={answerIndex} answer={answer} answerSelectedSave={this.answerSelectedSave} selected={this.state.selected[answerIndex]} />
            })
          }
          </Grid>

          <Grid container justify="center" style={{margin: '5px'}} >
            <Grid item >
              <Button onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
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

        <Grid item xs={12}>
          {
            this.props.mark.content.answers.map((answer, answerIndex) => {
              return <MarkQuestionAnswer key={answerIndex} answer={answer} answerSelectedSave={this.answerSelectedSave} completed={this.props.mark.content.completed} selected={this.state.selected[answerIndex]} />
            })
          }
        </Grid>

        <Grid container justify="center" style={{margin: '5px'}} >
          <Grid item >
            <Button disabled onClick={this.handleCheck} variant="contained" color="primary" >Comprobar</Button>
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
