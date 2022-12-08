import React from 'react'
import { Dialog, DialogTitle, DialogContent, makeStyles, Typography } from '@material-ui/core';
import Controls from "./shared/controls/Controls";
import CloseIcon from '@material-ui/icons/Close';

import CancelPresentationOutlinedIcon from '@material-ui/icons/CancelPresentationOutlined';
const useStyles = makeStyles(theme => ({
    dialogWrapper: {
        padding: theme.spacing(0),
        position: 'absolute',
        top: theme.spacing(1)
    },
    dialogTitle: {
        paddingRight: '0px'
    },
    title:{
        marginTop: theme.spacing(0),
        color: '#00377b!important',  
        flexGrow: 1
    }
}))

export default function Popup(props) {

    const { title, children, openPopup, setOpenPopup } = props;
    const classes = useStyles();

    return (
        <Dialog open={openPopup} maxWidth="lg" classes={{ paper: classes.dialogWrapper }}>
            <DialogTitle className={classes.dialogTitle}>
                <div style={{ display: 'flex' }}>
                    <Typography className={classes.title} variant="h5" component="div" style={{ flexGrow: 1 }}>
                       {title}
                    </Typography>
                    <Controls.ActionButton 
                    color="gray"
                    onClick={()=>{setOpenPopup(false)}}>
                    <CancelPresentationOutlinedIcon/>
                    </Controls.ActionButton>
                </div>
            </DialogTitle>
            <DialogContent dividers>
                {children}
            </DialogContent>
        </Dialog>
    )
}