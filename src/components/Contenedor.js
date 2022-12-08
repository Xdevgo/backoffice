import React from 'react';
import {
    makeStyles, Hidden
} from '@material-ui/core';
import Navbar from './Navbar';
import Cajon from './Cajon';

const estilos = makeStyles(theme => ({
    toolbar: theme.mixins.toolbar,
    root: {
        display: 'flex',
      },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
}))

const Contenedor = () => {

    const classes = estilos();
    const [abrir, setAbrir] = React.useState(false);

    const accionAbrir = () => {
        setAbrir(!abrir)
    }

    return (
        <div className={classes.root}>
        <Navbar accionAbrir={accionAbrir}/>

      <Hidden xsDown>
            <Cajon
                variante="temporary"
                open={abrir}
                onClose={accionAbrir}
            />
            </Hidden>
            <Hidden smUp>
            <Cajon
                variante="temporary"
                open={abrir}
                onClose={accionAbrir}
            />
            </Hidden>

        </div>
    )
}

export default Contenedor;
