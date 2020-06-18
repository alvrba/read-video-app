import React from 'react';
import {Grid, Paper, Typography} from '@material-ui/core';

import './Video.css';

export default class MarkWeb extends React.Component {


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

          <Grid item xs={12} >
            <Paper>
              <div class="web-responsive">
                <iframe style={{border: '0px', width: '100%', height: '100%'}} title="Mark website" src={this.props.mark.content.url}></iframe>
              </div>
            </Paper>
          </Grid>

        </Grid>
      )

  }


}
