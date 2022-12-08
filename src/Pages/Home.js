import React from 'react'
import { Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      backgroundColor: theme.palette.background.paper,
      marginTop: '15rem',
    },
    h1: {
        color: '#9B9B9B'
    }
  }));

function Home() {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Typography className={classes.h1} variant="h1">XGO</Typography>
        </div>
    )
}

export default Home
