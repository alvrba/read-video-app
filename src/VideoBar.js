import React from 'react';
import {Slider, Box, Button, Typography} from '@material-ui/core';

import SoundController from './SoundController';

import { PlayArrow, Pause } from '@material-ui/icons';


const flag = <svg style={{position:'absolute', bottom: '0', left: '0'}} className="bi bi-flag-fill" width="20px" height="20px" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3.5 1a.5.5 0 01.5.5v13a.5.5 0 01-1 0v-13a.5.5 0 01.5-.5z" clipRule="evenodd"/><path fillRule="evenodd" d="M3.762 2.558C4.735 1.909 5.348 1.5 6.5 1.5c.653 0 1.139.325 1.495.562l.032.022c.391.26.646.416.973.416.168 0 .356-.042.587-.126a8.89 8.89 0 00.593-.25c.058-.027.117-.053.18-.08.57-.255 1.278-.544 2.14-.544a.5.5 0 01.5.5v6a.5.5 0 01-.5.5c-.638 0-1.18.21-1.734.457l-.159.07c-.22.1-.453.205-.678.287A2.719 2.719 0 019 9.5c-.653 0-1.139-.325-1.495-.562l-.032-.022c-.391-.26-.646-.416-.973-.416-.833 0-1.218.246-2.223.916A.5.5 0 013.5 9V3a.5.5 0 01.223-.416l.04-.026z" clipRule="evenodd"/></svg>


export default class VideoBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soundOpen: false
    }
  }

  handlePlay = (event) => {
    if(this.props.insideMark === false) {
      this.props.playSave();
    }
  }

  handleStop = (event) => {
    if(this.props.insideMark === false) {
      this.props.stopSave();
    }
  }

  handlePopover = (event, value) => {
    const newSoundOpen = !this.state.soundOpen;
    this.setState({soundOpen: newSoundOpen});
  }

  handleRange = (event, value) => {
    if(this.props.insideMark === false) {
      this.props.rangeSave(value);
    }
  }

  handleSeekMark = (event) => {
    if(this.props.insideMark === false) {
      this.props.rangeMarkSave(event.currentTarget.id);
    }
  }



  render() {

    if(this.props.playerReady){
      if (this.props.insideMark === false) {
        return (
          <Box display="flex" style={{backgroundColor: '#ECECEC', height: '40px'}}>
            <Box alignItems="stretch" display="flex">
              {
                this.props.playing
                ? <Button onClick={this.handleStop} style={{height: '100%', borderRadius: '0'}} variant="contained" color="primary" disableElevation ><Pause /></Button>
                : <Button onClick={this.handlePlay} style={{height: '100%', borderRadius: '0'}} variant="contained" color="primary" disableElevation ><PlayArrow /></Button>
              }
            </Box>

            <Box>
              <SoundController volume={this.props.volume} volumeSave={this.props.volumeSave} insideMark={this.props.insideMark} />
            </Box>

            <Box alignItems="center"display="flex" p={1} style={{width:'50px'}} >
              <Typography style={{fontSize: '14px'}}>{this.props.currentTime}</Typography>
            </Box>

            <Box p={1} flexGrow={1}>
              <div style={{position: 'relative'}}>
                <Slider style={{ width: '100%'}} min={0} max={this.props.duration} value={this.props.currentSecond} onChange={this.handleRange} valueLabelDisplay="auto" valueLabelFormat={() => this.props.currentTime} />
                {
                  this.props.marks.map((mark, index) => {
                    const timePosition = (mark.time*100)/this.props.duration;
                    return <div id={mark.time} key={index} onClick={this.handleSeekMark} style={{cursor: 'pointer', width: '20px', height: '20px', backgroundColor:'rgba(0, 0, 0, 0)', position: 'absolute', left: timePosition+'%', top: '-5px', marginLeft: '-5px'}} >{flag}</div>
                  })
                }
              </div>
            </Box>


          </Box>
        );
      } else {
        return (
          <Box display="flex" style={{backgroundColor: '#ECECEC', height: '40px'}}>

            <Box alignItems="stretch" display="flex">
              <Button disabled onClick={this.handlePlay} style={{height: '100%', borderRadius: '0'}} variant="contained" color="primary" disableElevation ><PlayArrow /></Button>
            </Box>

            <Box>
              <SoundController volume={this.props.volume} volumeSave={this.props.volumeSave} insideMark={this.props.insideMark} />
            </Box>

            <Box alignItems="center"display="flex" p={1} style={{width:'50px'}} >
              <Typography style={{fontSize: '14px'}}>{this.props.currentTime}</Typography>
            </Box>

            <Box p={1} flexGrow={1}>
              <div style={{position: 'relative'}}>
                <Slider disabled style={{ width: '100%'}} min={0} max={this.props.duration} value={this.props.currentSecond} onChange={this.handleRange} valueLabelDisplay="auto" valueLabelFormat={() => this.props.currentTime} />
                {
                  this.props.marks.map((mark, index) => {
                    const timePosition = (mark.time*100)/this.props.duration;
                    return <div id={mark.time} key={index} onClick={this.handleSeekMark} style={{cursor: 'auto', width: '20px', height: '20px', backgroundColor:'rgba(0, 0, 0, 0)', position: 'absolute', left: timePosition+'%', top: '-5px', marginLeft: '-5px'}} >{flag}</div>
                  })
                }
              </div>
            </Box>


          </Box>
        );
      }
    } else {
      return null;
    }
  }






}
