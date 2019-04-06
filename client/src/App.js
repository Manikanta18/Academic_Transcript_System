import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Main from './components/main';
import iiitvLogo from './iiitv.png';

const styles = {
  root: {
    flexGrow: 1,
  },

  appbar: {
    alignItems: 'center',
    height:100,
  },

  footer: {
    alignItems: 'center',
    height:130,
  },

  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  },

  title: {
    padding:50,
    fontSize: '2rem',
  },

  foot: {
    padding:50,
    color:'white',
  }

};

function App(props) {
  const { classes } = props;
  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.appbar}>
        <Toolbar variant="dense" color='#1e88e5' container>
          {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <Menuz/>
          </IconButton> */}
          <img src={iiitvLogo} alt="IIITV" />
          <Typography variant="h5" color="inherit" className={classes.title}>
            IIITV Academic Transcript System
          </Typography>
        </Toolbar>
      </AppBar>

      <Main/>

      <AppBar position="static" className={classes.footer}>
        <Toolbar variant="dense" color='#1e88e5'>
        <Typography variant="caption" align="center" className={classes.foot}>
          &copy; Manikanta Jalla
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}

App.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(App);