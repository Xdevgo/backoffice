import React from 'react'
import { TextField , makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    input: {
        '& .MuiOutlinedInput-input': {
            padding: '0px',
        }
},
}))


export default function Input(props) {

    const classes = useStyles();
    const { name, label, value,error=null, onChange, ...other } = props;
    return (
        <TextField
          className={classes.input}
            variant="outlined"
            label={label}
            name={name}
            value={value}
            onChange={onChange}
            {...other}
            {...(error && {error:true,helperText:error})}
        />
    )
}