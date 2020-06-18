import React from 'react';
import {Button, Popover, Slider, Grid, Box} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { VolumeDown, VolumeUp, VolumeOff } from '@material-ui/icons';


const useStyles = makeStyles((theme) => ({
  typography: {
    padding: theme.spacing(2),
  },
}));

export default function SoundController(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleVolume = (event, value) => {
    props.volumeSave(value);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  let soundIcon = <VolumeUp />;
  if (props.volume === 0) {
    soundIcon = <VolumeOff />;
  } else if (props.volume > 50) {
    soundIcon = <VolumeUp />;
  } else {
    soundIcon = <VolumeDown />;
  }

  return (
    <div>
      <Box alignItems="stretch" display="flex" style={{height: '40px'}}>
        {
          props.insideMark
          ? <Button disabled Click={handleClick} style={{height: '100%', borderRadius: '0'}} variant="contained" color="primary" disableElevation >{soundIcon}</Button>
          : <Button onClick={handleClick} style={{height: '100%', borderRadius: '0'}} variant="contained" color="primary" disableElevation >{soundIcon}</Button>
        }
      </Box>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
          <Grid container direction="column" justify="center" alignItems="center" pacing={2}>

            <Grid item style={{padding: '5px'}}>
              <VolumeUp />
            </Grid>

            <Grid item xs style={{height: '100px'}}>
              <Slider orientation="vertical" value={props.volume} onChange={handleVolume} aria-labelledby="continuous-slider" />
            </Grid>

            <Grid item style={{padding: '5px'}}>
              <VolumeDown />
            </Grid>

          </Grid>

      </Popover>
    </div>
  );
}
