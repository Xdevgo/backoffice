import React from 'react';
import {AppBar, Toolbar, makeStyles, IconButton} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

const drawerWidth = 240;
const useStyle = makeStyles(theme => ({
    menuButton:{
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('xxl')]: {
          display: 'none',
        },
    },
    title: {
      flexGrow: 1,
    },
    appBar: {
      [theme.breakpoints.up('xxl')]: {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: drawerWidth,
      },
    } ,
     large: {
      width: theme.spacing(7),
      height: theme.spacing(7),
    }
}))

const Navbar = (props) => {
    const classes = useStyle()

    return(
             <AppBar className={classes.appBar}>
              <Toolbar>
               <IconButton  className={classes.menuButton} color="inherit" aria-label="menu"
                  onClick={() => props.accionAbrir()}>
                      <MenuIcon/>
                  </IconButton>
              </Toolbar>
            </AppBar>
    );
};
export default Navbar;