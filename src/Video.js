import React from 'react';
import {Grid, Paper, Box} from '@material-ui/core';

import VideoBar from './VideoBar';
import MarksList from './MarksList';

import './Video.css';

var timerMarks;
var timerSeconds;

export default class Video extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      duration: 0,
      playerReady: false,
      currentSecond: 0,
      currentTime: '00:00',
      previousStop: 0,
      marksId: [],
      volume: 80,
      insideMark: false,
      returning: false,
      playing: false
    }

  }

  componentDidMount = () => {

  if (!window.YT) {
    var tag = document.createElement('script');
    tag.src = "https://www.youtube.com/iframe_api";
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

    window['onYouTubeIframeAPIReady'] = (e) => {
      this.loadVideo();
    };

  } else {
    this.loadVideo();
  }

}

loadVideo = () => {
  this.player = new window['YT'].Player('player', {
    videoId: this.props.url,
    height: "100%",
    width: "100%",
    playerVars: {'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'rel': 0, 'showinfo': 0, 'playsinline': 1},
    events: {
      'onStateChange': this.onPlayerStateChange,
      'onReady': this.onPlayerReady
    }
  });
}

//////////////////////////////////////////////////////


  stopSave = () => {
    this.player.pauseVideo();
  }

  playSave = () => {
    this.player.playVideo();
  }

  timerStart = () => {

    timerSeconds = setInterval(() => {
      let current = this.player.getCurrentTime();
      let currentInt = Math.floor(current);
      this.setState({currentSecond: currentInt});
      this.convertTime(currentInt);
    }, 200);

    timerMarks = setInterval(() => {
      let second = this.player.getCurrentTime();
      this.searchMarks(second);
    }, 500);

  }

  timerStop = () =>{
    clearInterval(timerMarks);
    clearInterval(timerSeconds);
    let current = this.player.getCurrentTime();
    let currentInt = Math.floor(current);
    this.convertTime(currentInt);
    this.setState({currentSecond: currentInt});
  }

  onPlayerStateChange = (event) => {
    if(event.data === 1){
      this.timerStart();
      this.setState({marksId: [], insideMark: false, playing: true});
    } else {
      this.timerStop();
      this.setState({playing: false});
    }
  }

  onPlayerReady = (event) => {
    this.setState({duration: this.player.getDuration() -1, playerReady: true});
    this.player.setVolume(80);
  }

  convertTime = (second) => {
    const hours = Math.floor(second / 3600);
    const minutes = Math.floor((second - hours*3600) / 60);
    const seconds = Math.floor(second - (hours*3600 + minutes*60));
    const hoursText = hours.toString().padStart(2,'0');
    const minutesText = minutes.toString().padStart(2,'0');
    const secondsText = seconds.toString().padStart(2,'0');
    if (hours === 0) {
      const time = minutesText+':'+secondsText;
      this.setState({currentTime: time});
    } else {
      const time = hoursText+':'+minutesText+':'+secondsText;
      this.setState({currentTime: time});
    }
  }

  volumeSave = (volume) => {
    this.player.setVolume(volume);
    this.setState({volume: volume});
  }

  seekSecond = (second) => {
    this.setState({currentSecond: second, returning: true});
    this.convertTime(Math.floor(second));
    this.player.seekTo(second);
    this.playSave();
  }

  rangeSave = (second) => {
    if (second < this.state.currentSecond) {
      this.setState({returning: true});
    }
    this.setState({currentSecond: second});
    this.convertTime(Math.floor(second));
    this.player.seekTo(second);
  }

  rangeMarkSave = (second) => {
    this.stopSave();
    this.player.seekTo(second);
    this.setState({insideMark: true, currentSecond: second});
    this.convertTime(Math.floor(second));
    this.searchMarks(second);
  }


  searchMarks = (second) => {
    let current = second;
    let currentInt = Math.floor(current);

    var marksId = [];

    for (const [index, mark] of this.props.marks.entries()) {
      if (mark.time === currentInt) {
        marksId.push(index);
      }
    }

    if (marksId.length !== 0) {

      if (this.state.returning === false) {
        if (currentInt === Math.floor(this.state.previousStop) && current > this.state.previousStop) {
          this.setState({returning: false});
        } else {
          this.stopSave()
          this.setState({previousStop: current, marksId: marksId, insideMark: true, returning: false});
        }
      } else {
        this.stopSave()
        this.setState({previousStop: current, marksId: marksId, insideMark: true, returning: false});
      }

    }
  }



  render() {

    const videoStyle = this.state.marksId.length !== 0 ? {filter: 'blur(2px)'} : {};

    return (

        <Grid container justify="center">
          <Grid item xs={12} lg={9} >



              <Box style={{position: 'relative'}} >

                <div className="video-responsive" style={videoStyle}>
                  <div id="player"></div>
                </div>




                  {
                    this.state.marksId.length !== 0
                    ?
                    <>
                      <Grid container alignItems="center" justify="center" style={{position: 'absolute', top: '0', zIndex: '1', marginTop: '10px'}}>
                        <Grid item xs={12} lg={11}>
                          <Box  >
                            <Paper style={{backgroundColor: 'rgb(255,255,255)',  padding:'10px', borderRadius: '0'}}>
                              <MarksList
                                dispatch={this.props.dispatch}
                                marks={this.props.marks}
                                marksId={this.state.marksId}
                                playSave={this.playSave}
                                seekSecond={this.seekSecond}
                              />

                            </Paper>

                          </Box>
                        </Grid>
                      </Grid>

                      <Box style={{position: 'absolute', top: '0', width: '100%', height: '100%', zIndex: '0.5', backgroundColor: 'rgb(245, 245, 245, 0.4)'}}>
                      </Box>

                    </>

                    : null
                  }





                <Box style={{ width: '100%'}} >
                  <Box style={videoStyle}>
                  <VideoBar
                    marks={this.props.marks}
                    seekSecond={this.seekSecond}
                    playing={this.state.playing}
                    playerReady={this.state.playerReady}
                    duration={this.state.duration}
                    currentSecond={this.state.currentSecond}
                    currentTime={this.state.currentTime}
                    playSave={this.playSave}
                    stopSave={this.stopSave}
                    rangeSave={this.rangeSave}
                    rangeMarkSave={this.rangeMarkSave}
                    insideMark={this.state.insideMark}
                    volume={this.state.volume}
                    volumeSave={this.volumeSave}
                  />
                  </Box>
                </Box>

              </Box>


          </Grid>


        </Grid>

    );
  }


}
