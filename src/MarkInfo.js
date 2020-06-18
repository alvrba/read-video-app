import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';

export default class MarkInfo extends React.Component {


  render() {

      return(
        <Grid container spacing={2} style={{paddingBottom: '20px'}} >

          <Grid item >
            <Paper style={{padding: '4px', backgroundColor: 'orange'}}>
              <Typography style={{fontSize: '12px', color: 'white'}} >{this.props.mark.type}</Typography>
            </Paper>
          </Grid>

          <Grid item xs={12} >
            <Typography >{this.props.mark.content.description}</Typography>
          </Grid>

        </Grid>
      )

  }


}
