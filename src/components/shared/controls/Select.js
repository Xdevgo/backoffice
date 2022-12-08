import React from 'react'
import { FormControl, InputLabel, Select as MuiSelect, MenuItem, FormHelperText } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(0),
      minWidth: '90%',
    },
    selectEmpty: {
      marginTop: theme.spacing(0),
    },
    label: {
        color: 'rgba(0, 0, 0, 0.54)'
    },
    label2:{
        color: '#00377b',
    }
  }));

export default function Select(props) {
    const classes = useStyles();

    const { name, label, styledisable, value,error=null, onChange, options , ...other} = props;

    return (
        <FormControl variant="outlined"  className={classes.formControl}
        {...(error && {error:true})}>
            <InputLabel className={(styledisable===false ) ? classes.label: classes.label2}>{label}</InputLabel>
            <MuiSelect
                label={label}
                name={name}
                value={value}
                {...other}
                onChange={onChange}>
                {/*<MenuItem value="">None</MenuItem>*/}
                {
                    options.map(
                        item => (<MenuItem key={item.id} value={item.id}>{item.title}</MenuItem>)
                    )
                }
            </MuiSelect>
            {error && <FormHelperText>{error}</FormHelperText>}
        </FormControl>
    )
}