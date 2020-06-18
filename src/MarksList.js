import React from 'react';
import {returned} from './redux/actions';
import {Grid, Button} from '@material-ui/core';

import MarkTest from './MarkTest';
import MarkQuestion from './MarkQuestion';
import MarkWeb from './MarkWeb';
import MarkInfo from './MarkInfo';


export default class MarksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentCount: 0
    }
  }


  handlePlay = (event) => {
    this.props.playSave();
  }

  moreMark = (event) => {
    const index = this.props.marksId[this.state.currentCount];
    const mark = this.props.marks[this.props.marksId[this.state.currentCount]];
    var completed = 0;

    if (this.props.marksId.length-1 === this.state.currentCount) {
      if (mark.content.completed === false) {
        this.setState({currentCount: this.state.currentCount});
      } else if (mark.content.blocks && mark.content.correct === false && mark.content.returned === false) {
        this.props.seekSecond(mark.content.returnTime);
        this.props.dispatch(returned(index));
        this.setState({currentCount: 0});
      } else {
        this.props.marksId.map((markId, index) => {
          if (this.props.marks[markId].content.completed) {
            completed = completed + 1;
          }
        });
        if (completed === this.props.marksId.length) {
          this.props.playSave();
          this.setState({currentCount: 0});
        }
      }
    } else {
      if (mark.content.completed === false) {
        this.setState({currentCount: this.state.currentCount});
      } else if (mark.content.blocks && mark.content.correct === false && mark.content.returned === false) {
        this.props.seekSecond(mark.content.returnTime);
        this.props.dispatch(returned(index));
        this.setState({currentCount: 0});
      } else {
        this.setState({currentCount: this.state.currentCount+1});
      }
    }
  }

  lessMark = (event) => {
    if (this.state.currentCount === 0) {
      this.setState({currentCount: this.state.currentCount});
    } else {
      this.setState({currentCount: this.state.currentCount-1});
    }
  }


  render() {

    const index = this.props.marksId[this.state.currentCount];
    const mark = this.props.marks[this.props.marksId[this.state.currentCount]];

    const renderType = () => {
      if (mark.type === 'TEST') {
        return <MarkTest dispatch={this.props.dispatch} mark={mark} index={index} />
      } else if (mark.type === 'QUESTION') {
        return <MarkQuestion dispatch={this.props.dispatch} mark={mark} index={index} />
      } else if (mark.type === 'WEB') {
        return <MarkWeb mark={mark} index={index} />
      } else if (mark.type === 'INFO') {
        return <MarkInfo mark={mark} index={index} />
      } else {
        return <p>No se ha encontrado la marca</p>
      }
    }

    const renderMoreButton = () => {

      if (mark.content.completed) {
        if (mark.content.correct === false && mark.content.blocks && mark.content.returned === false) {
          return <Button onClick={this.moreMark} variant="contained" color="primary" >Volver a revisar el video</Button>
        } else {
          return <Button onClick={this.moreMark} variant="contained" color="primary" >Siguiente</Button>
        }
      } else {
        return <Button disabled onClick={this.moreMark} variant="contained" color="primary" >Siguiente</Button>
      }
    }


    return(
      <>
    { this.props.marksId.length !== 0
      ?
        <Grid container>

          <Grid item xs={12} >
            <div style={{height: '100%'}}>
            {renderType()}
            </div>
          </Grid>

          <Grid item xs>
            <Grid container justify="flex-end" spacing={2} style={{backgroundColor: '#ECECEC'}} >
              <Grid item>
                { this.state.currentCount === 0
                  ? <Button onClick={this.lessMark} disabled variant="contained" color="primary" >Anterior</Button>
                  : <Button onClick={this.lessMark} variant="contained" color="primary" >Anterior</Button>
                }
              </Grid>

              <Grid item>
                {renderMoreButton()}
              </Grid>
            </Grid>
          </Grid>


        </Grid>
      : null
    }
    </>
    )
  }


}
