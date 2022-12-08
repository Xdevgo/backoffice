import React,{useState, useEffect} from 'react'
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import {  makeStyles } from '@material-ui/core';
import axios from 'axios';
const useStyles = makeStyles(theme => ({
  toolbar: theme.mixins.toolbar,
  
}))

const getParams = "https://us-central1-xgogt502.cloudfunctions.net/xgoapiplan/api/conf" 

export default function Parametrizacion() {
  const [records, setRecords] = useState([]);
  const [RecordsDriver, setRecordsDriver] = useState([]);
  const classes = useStyles();
  const [value, setValue] = React.useState('');
  const [ValueDriver, setValueDriver] = React.useState('');
  const [Identificador, setIdentificador] = React.useState('');

  const handleChange = async(event) => {
    console.log(event.target.value)
    let idpoint=  records.filter(function(i) { return i.nombre === event.target.value; });
    //console.log(idpoint[0]._id)
    const data = {"identificador":idpoint[0]._id, "rule": "location_inicial"}
    await axios.patch(`${getParams}`, data)
    .then(response => {
        console.log(response);
 });
 setValue(event.target.value);

}

const handleChangeDriver = async(event) => {
  console.log(event.target.value)
  let idpoint=  RecordsDriver.filter(function(i) { return i.nombre === event.target.value; });
  //console.log(idpoint[0]._id)
  const data = {"identificador":idpoint[0]._id, "rule": "driver"}
  await axios.patch(`${getParams}`, data)
  .then(response => {
      console.log(response);
});
setValueDriver(event.target.value);

}


  const peticionGet = async() => {
    await axios.get(`${getParams}/location_inicial`)
    .then(response => {
        console.log(response.data.points);
        setRecords(response.data.points);
        let selected=  response.data.points.filter(function(i) { return i.primary == true; });
        console.log(selected[0].nombre)
        setValue(selected[0].nombre)
    })
 
}

const peticionGetDriver = async() => {
  await axios.get(`${getParams}/driver`)
  .then(response => {
    setRecordsDriver(response.data.points);
      let selected=  response.data.points.filter(function(i) { return i.primary === true; });
      console.log(selected[0].nombre)
      setValueDriver(selected[0].nombre)
  })

}

  useEffect(() => {
    peticionGet();
    peticionGetDriver();
}, []);

  return (
    <>
    <div className={classes.toolbar}></div>   
    <FormControl component="fieldset">
      <FormLabel component="legend">Punto de Inicio</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={value} onChange={handleChange}>
        {
          records.map(
            item => (
              <FormControlLabel  key={item.id} value={item.nombre} control={<Radio />} label={item.nombre}/>
            )
          )
        }
      </RadioGroup>
    </FormControl>

    <FormControl component="fieldset">
      <FormLabel component="legend">Driver Planificación</FormLabel>
      <RadioGroup aria-label="gender" name="gender1" value={ValueDriver} onChange={handleChangeDriver}>
        {
          RecordsDriver.map(
            item => (
              <FormControlLabel  key={item.id} value={item.nombre} control={<Radio />} label={item.nombre}/>
            )
          )
        }
      </RadioGroup>
    </FormControl>
    </>
  );
}
