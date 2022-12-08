import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slider, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, FormLabel, Checkbox, TextField, Button,
  Dialog, DialogActions, DialogContent, DialogTitle, InputLabel, Input, MenuItem, Select,Paper, NativeSelect  } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../shared/controls/Controls';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CheckIcon from '@material-ui/icons/Check';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';

import * as DeliveryService from '../../services/DeliveryService';
const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  root2: {
    flexGrow: 1,
  },
  control: {
    padding: theme.spacing(0),
  },
  textField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    //textAlign: 'center',
    width: '90%',
    '& .Mui-disabled': {
      color: '#00377b',
      //fontSize: '1rem',
      
    },
  },
  textField2: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    //textAlign: 'center',
    width: '90%',
  },
  textFieldMulti: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    //textAlign: 'center',
    width: '90%',
    '& .Mui-disabled': {
      color: '#00377b',
      //fontSize: '1rem',
      fontSize: '0.89rem',

      
    },
  },
  textFieldMulti2: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(1),
    //textAlign: 'center',
    width: '90%',
  },
  selectField: {
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    paddingRight: theme.spacing(1),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    //textAlign: 'center',
    width: '100%',
    '& .Mui-disabled': {
      color: '#00377b',
      //fontSize: '1rem',      
      //border: '1px inset rgb(0, 200, 255)',
    
      
  },
  '& label': {
    color: 'red'
    }
  },
  slider: {
    marginTop: theme.spacing(0),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
    width: '90%',
  },
  button:{
    marginTop: theme.spacing(1),
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  Radio: {
    marginTop: theme.spacing(2),
    paddingTop: theme.spacing(0),
    paddingBottom: theme.spacing(0),
  },
  time: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  date: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
  pageContent: {
    margin: theme.spacing(0),
    padding: theme.spacing(0)
  },
  paper: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: 5,
    display: 'flex',
    flexWrap: 'wrap',
  },
  paper2: {
    padding: theme.spacing(2),
    marginTop: theme.spacing(1),
    borderRadius: 5,
    //background:'#00377b',
    background:'#EEEFF0',
    display: 'flex',
    flexWrap: 'wrap',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(0),
  },
  letra: {
    marginTop: theme.spacing(0),
    color: theme.palette.primary.main   
  },
  letra2: {
    marginTop: theme.spacing(0),
    color: '#00377b',
    fontSize: '1rem',
  },
  input: {
    padding: '0px',
    margin: '0px'
  },
}));

var today = new Date();
let date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear()

const initialFValues = {
  creator: "0",
  id: 0,
  mobileClient: 0,
  originName: '',
  addressOrigin: '',
  muniOrigin: '',
  zoneOrigin: 0,
  uriLocationOrigin: '',
  indicationsOrigin: '',
  coordenadasLng: 0,
  coordenadasLat: 0,
  deptoOrigin: 'Guatemala',
  bank: '',
  typeacount: '',
  noacount: 0,
  nameacount: '',
  createDate: new Date(),
  schedulingDate: new Date().toLocaleDateString('en-GT'),
  schedulingTime: '08:00',
  horaindicaciones : 'D',
  amount: '',
  weight: 5,
  dimensions: 10,
  quantity: 1,
  product: 'Paquete',
  targetName: '',
  mobileTarget: 0,
  addressTarget: '',
  uriLocationTarget: '',
  coordenadasTargetLat: 0,
  coordenadasTargetLng: 0,
  deptoTarget: 'Guatemala',
  muniTarget: '',
  zoneTarget: 0,
  indicationsTarget: '',
}



const EntregaForm = (props) => {
  console.log("DELIVERYFORM")
  const styles = useStyles();

  const { addOrEdit, recordForEdit, recordForUpdate ,setTitle } = props
  const [DisabledDirO, setDisabledDirO] = useState(false)
  const [DisabledLocO, setDisabledLocO] = useState(true)
  const [DisabledDirT, setDisabledDirT] = useState(false)
  const [DisabledLocT, setDisabledLocT] = useState(true)
  const [DisabledBank, setDisabledBank] = useState(true)
  const [disable , setDisable] = useState(false)
  const [stateBank, setStateBank,] = useState(false)
 const [coordenadasLat1, setcoordenadasLat] = useState(0)
  const [coordenadasLng1, setcoordenadasLng] = useState(0)
  const [coordenadasTargetLat1, setcoordenadasTargetLat] = useState(0)
  const [coordenadasTargetLng1, setcoordenadasTargetLng] = useState(0)
//new Date().toLocaleDateString()
console.log(  new Date().toLocaleDateString('en-CA'))
  const [selectedDate, setSelectedDate] = React.useState( new Date().toLocaleDateString('en-GT'));
  const [selectedTime, setselectedTime] = React.useState('08:00')
const [open, setOpen] = useState(false);
const [age, setAge] = useState('');
const [selectedweight ,setSelectedweight] = useState(2)



const handleChange = (event) => {
  setAge(Number(event.target.value) || '');
};

const handleClickOpen = () => {
  setOpen(true);
};

const handleClose = () => {
  setOpen(false);
};
  const handleDateChange = (event) => {
    console.log(event)
    values.schedulingDate = event
    setSelectedDate(event);
  };

  const handleTimeChange = (time) => {
    console.log(time.target.value)
    values.schedulingTime = time.target.value
    setselectedTime(time.target.value);
  };

 /** const handleweight = (weight) => {
    console.log(weight.target.value)
    values.weight = weight.target.outerText
    setSelectedweight(weight.target.outerText)

  };

  const handleDimensions = (value) => {
    console.log(value.target.ariaValueNow)
    //values.weight = dimension.target.outerText
    //setSelectedweight(dimension.target.outerText)

  };*/

  const handleBank = (event) => {
    setStateBank(event.target.checked);
    if(event.target.checked === true){
      setDisabledBank(false)
    }else{
      setDisabledBank(true)
    }
  };

  const handlerTipoDirOrigin = (event) => {
    console.log(event.target.value)
    if (event.target.value === 'address') {
      setDisabledDirO(false);
      setDisabledLocO(true);
    } else {
      setDisabledDirO(true);
      setDisabledLocO(false);
    }
  }

  const handlerTipoDirTarget = (event) => {
    console.log(event.target.value)
     if (event.target.value === 'addressTarget') {
      setDisabledDirT(false);
      setDisabledLocT(true);
     } else {
      setDisabledDirT(true);
      setDisabledLocT(false);
     }
  }

 const handlerHora = (event) => {
  console.log(event.target.value)
  values.horaindicaciones = event.target.value
      
   }



  const valuepeso = (value) => {
    console.log(value)
    values.weight = value
    return `${value}°C`;
  }

  const valuedimensiones = (value) => {
    console.log(value)
    values.dimensions = value
    return `${value}°C`;
  }


  const validate = (fieldValues = values) => {
    let temp = { ...errors }
    if ('originName' in fieldValues)
      temp.originName = fieldValues.originName ? "" : "Se requiere el nombre de la persona que envia."
    if ('addressOrigin' in fieldValues)
      // temp.addressOrigin = (/$^|.+@.+..+/).test(fieldValues.addressOrigin) ? "" : "Se requiere la dirección de recoleción."
     temp.addressOrigin = fieldValues.addressOrigin ? "" : "Se requiere la dirección de recoleción."
    if ('mobileClient' in fieldValues)
      temp.mobileClient = fieldValues.mobileClient.toString().length > 7 ? "" : "Debe ingresar un numero de 8 caracteres."
    //if ('deptoOrigin' in fieldValues)
     // temp.deptoOrigin = fieldValues.deptoOrigin.length !== 0 ? "" : "This field is required."
    setErrors({
      ...temp
    })
   
    if (fieldValues === values)
    console.log(fieldValues)
    console.log(values)
      return Object.values(temp).every(x => x === "")
  }


  const {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm
  } = useForm(initialFValues, true, validate);

  /* const handleSubmit = e => {
       e.preventDefault()
       if (validate()){
           DeliveryService.insertEmployee(values)
           resetForm()
       }
   }*/

  const handleNewCustomer = e => {
    console.log(e)
    e.preventDefault()
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  }


  const splitcoords = e => {
    console.log(values.uriLocationOrigin)
    let STR = values.uriLocationOrigin
    let pointIni = STR.search('q=') + 2;


    let result
    result = STR.slice(pointIni, -1);
    let pointFin = result.search('&z=');
    result = result.slice(0, pointFin);
    console.log(result)
    let coords = result.split('%2C')
    coords = result.split(',')
    console.log("coords-----------------------")
    console.log(coords)
    values.coordenadasLng = coords[1]
    values.coordenadasLat = coords[0]
    setcoordenadasLng(coords[1]);
    setcoordenadasLat(coords[0]);

  }


  const splitcoordsTarget = e => {
    console.log(values.uriLocationTarget)
    let STR = values.uriLocationTarget
    let pointIni = STR.search('q=') + 2;


    let result
    result = STR.slice(pointIni, -1);
    let pointFin = result.search('&z=');
    result = result.slice(0, pointFin);
    console.log(result)
    let coords = result.split('%2C')
    coords = result.split(',')
    values.coordenadasTargetLat = coords[0]
    values.coordenadasTargetLng = coords[1]
    setcoordenadasTargetLng(coords[1]);
    setcoordenadasTargetLat(coords[0]);

  }


  useEffect(() => {
    console.log("USEREFFECT")
    if (recordForEdit != null) {
      console.log(recordForEdit)
      setValues({
        ...recordForEdit
      })
      setStateBank(true)
      setDisable(true)
      setcoordenadasLat(recordForEdit.coordenadasLat1)
      setcoordenadasLng(recordForEdit.coordenadasLng1)
      setTitle("Cliente existente")
    }
  }, [recordForEdit,recordForUpdate])




  return (
    <div className={styles.root}>
      <Form onSubmit={handleNewCustomer} >
       <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container className={styles.root2} spacing={0}>
      <Typography className={styles.letra} variant="h9" gutterBottom> {values.creator !== '0' ? 'No. Cliente: ' + values.creator : ""}</Typography>
      <Grid item xs={12}>
        <Grid container justifyContent="flex-start" spacing={0}>
        <Paper className={(disable===false) ? styles.paper: styles.paper2} variant="outlined" square >
            <Grid item xs={12} sm={2}>
            <Controls.Input
              label="Telefono Cliente"
              name="mobileClient"
              className={styles.textField}
              value={values.mobileClient !== 0 ? values.mobileClient : ''}
              onChange={handleInputChange}
              error={errors.mobileClient}
              //helperText="Some important text"
              disabled={disable}
            />
            </Grid>
            <Grid item xs={12} sm={4}>
            <Controls.Input
              name="originName"
              label="Nombre de Cliente"
              className={styles.textField}
              value={values.originName}
              onChange={handleInputChange}
              error={errors.originName}
              disabled={disable}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset" disabled={disable}>
              <RadioGroup row aria-label="position"   name="position" defaultValue="address" onChange={handlerTipoDirOrigin}>
                <FormControlLabel
                  value="address"
                  control={<Radio color="primary" />}
                  label="Dirección"
                  labelPlacement="End"
                />
                <FormControlLabel
                  value="location"
                  control={<Radio color="primary" />}
                  label="Ubicación"
                  labelPlacement="End"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
          <FormGroup row>
            <FormControlLabel
              control={<Checkbox checked={stateBank} disabled={disable} onChange={handleBank} name="checkedA" />}
              label="CCE"
            />
          </FormGroup>
          </Grid>

          <Grid item xs={12} sm={4}>
            <Controls.Input
              label="Dirección Cliente"
              name="addressOrigin"
              multiline={true}
              fullWidth={true}
              maxRows={2}
              minRows={2}
              variant="outlined"
              className={(disable) ? styles.textFieldMulti: styles.textFieldMulti2} 
              value={values.addressOrigin}
              onChange={handleInputChange}
              error={errors.addressOrigin}
              disabled={DisabledDirO || disable}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Select
              name="muniOrigin"
              label="Municipio"
              value={values.muniOrigin}
              className={(disable) ? styles.selectField: styles.selectField2} 
              styledisable={disable}
              onChange={handleInputChange}
              options={DeliveryService.getMuniCollection()}
              error={errors.muniOrigin}
              disabled={DisabledDirO || disable}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Select
              name="zoneOrigin"
              label="Zona"
              value={values.zoneOrigin}
              className={(disable) ? styles.selectField: styles.selectField2} 
              styledisable={disable}
              onChange={handleInputChange}
              options={DeliveryService.getZoneCollection()}
              error={errors.zoneOrigin}
              disabled={DisabledDirO || disable}
            />
          </Grid>  
          <Grid item xs={12} sm={2}>
            <Controls.Input
              label="Ubicación Cliente"
              name="uriLocationOrigin"
              className={(disable) ? styles.textField: styles.textField2} 
              value={values.uriLocationOrigin}
              onChange={handleInputChange}
              error={errors.uriLocationOrigin}
              disabled={DisabledLocO || disable}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Button
              text="Cargar"
              className={styles.button}
              disabled={DisabledLocO || disable}
              onClick={splitcoords} />
          </Grid>
 

          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Indicaciones"
              name="indicationsOrigin"
              className={styles.textField}
              value={values.indicationsOrigin}
              onChange={handleInputChange}
              error={errors.indicationsOrigin}  
              disabled={disable}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography className={(disable===false) ? styles.letra: styles.letra2}  variant="button" display="block" gutterBottom> {coordenadasLat1}{coordenadasLng1}</Typography>
          </Grid>
          <Grid item xs={12} sm={1}>
            {coordenadasLng1 !== 0 ?(<CheckIcon color='secondary' fontSize='small'/>): (<></>)}
            </Grid>


            <Grid item xs={12} sm={3}>
            <Controls.Select
              name="bank"
              label="Banco"
              value={values.bank}
              styledisable={disable}
              className={(disable) ? styles.selectField: styles.selectField2} 
              onChange={handleInputChange}
              options={DeliveryService.getBanks()}
              error={errors.bank}
              disabled={DisabledBank}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controls.Select
              name="typeacount"
              label="Tipo"
              className={(disable) ? styles.selectField: styles.selectField2} 
              styledisable={disable}
              value={values.typeacount}
              onChange={handleInputChange}
              options={DeliveryService.gettypeAccount()}
              error={errors.typeacount}
              disabled={DisabledBank}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controls.Input
              name="noacount"
              label="No. Cuenta"
              className={(disable) ? styles.textField: styles.textField2} 
              value={values.noacount !== 0 ? values.noacount : ''}
              onChange={handleInputChange}
              error={errors.nocuenta}
              disabled={DisabledBank}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
          <Controls.Input
              name="nameacount"
              label="Nombre Cuenta"
              className={(disable) ? styles.textField: styles.textField2} 
              value={values.nameacount !== 0 ? values.nameacount : ''}
              onChange={handleInputChange}
              error={errors.nameacount}
              disabled={DisabledBank}
            />
          </Grid>
          </Paper>
        </Grid>
        <Grid container justifyContent="flex-start" spacing={0}>
        <Paper className={styles.paper} variant="outlined" square>
          <Grid item xs={12} sm={3}>
          <KeyboardDatePicker
          margin="normal"
          id="schedulingDate"
          label="Fecha Entrega"
          defaultValue={selectedDate}
          format="dd/MM/yyyy"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />
          </Grid>
          <Grid item xs={12} sm={3}>
          <TextField
        id="time"
        label="Hora"
        type="time"
        defaultValue={selectedTime}
        value={selectedTime}
        onChange={handleTimeChange}
        className={styles.time}
        InputLabelProps={{
          shrink: true,
        }}
        inputProps={{
          step: 300, // 5 min
        }}
      />
          </Grid>
          <Grid item xs={12} sm={4}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" className={styles.Radio} name="position" defaultValue="D" onChange={handlerHora}>
                <FormControlLabel
                  value="A"
                  control={<Radio color="primary" />}
                  label="Antes"
                  labelPlacement="End"
                />
                <FormControlLabel
                  value="E"
                  control={<Radio color="primary" />}
                  label="Exacto"
                  labelPlacement="End"
                />
                <FormControlLabel
                  value="D"
                  control={<Radio color="primary" />}
                  label="Despues"
                  labelPlacement="End"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={2}>   
          </Grid>

          <Grid item xs={12} sm={1}>
            <Controls.Input
              label="Cant."
              name="quantity"
              className={styles.textField}
              value={values.quantity}
              onChange={handleInputChange}
              error={errors.quantity}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Controls.Input
              label="Descripción Producto"
              name="product"
              className={styles.textField}
              value={values.product}
              onChange={handleInputChange}
              error={errors.product}
            />
          </Grid>
          <Grid item xs={12} sm={2}>

            <Controls.Input
              label="Total"
              name="amount"
              className={styles.textField}
              value={values.amount}
              onChange={handleInputChange}
              error={errors.amount}
            />
          </Grid>
          <Grid item xs={12} sm={3} >
            <Typography id="discrete-slider-custom" gutterBottom>
              Peso
            </Typography>
            <Slider
              className={styles.slider}
              defaultValue={values.weight}
              getAriaValueText={valuepeso}
              aria-labelledby="discrete-slider-custom"
              step={5}
              max={30}
              //onChange={handleweight}
              valueLabelDisplay="auto"
              marks={DeliveryService.getPeso()}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography id="discrete-slider-custom" gutterBottom>
              Dimensiones
            </Typography>
            <Slider
              className={styles.slider}
              defaultValue={values.dimensions}
              getAriaValueText={valuedimensiones}
              aria-labelledby="discrete-slider-custom"
              step={10}
              max={50}
              //onChange={handleDimensions}
              valueLabelDisplay="auto"
              marks={DeliveryService.getDimensiones()}
            />
          </Grid>
          
          </Paper>
          </Grid>
        <Grid container justifyContent="flex-start" spacing={0}>
        <Paper className={styles.paper} variant="outlined" square>
          <Grid item xs={12} sm={2}>
            <Controls.Input
              label="Telefono Entrega"
              name="mobileTarget"
              className={styles.textField}
              value={values.mobileTarget !== 0 ? values.mobileTarget : ''}
              onChange={handleInputChange}
              error={errors.mobileTarget}
            />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Controls.Input
              name="targetName"
              label="Nombre Entrega"
              className={styles.textField}
              value={values.targetName}
              onChange={handleInputChange}
              error={errors.targetName}
            />
          </Grid>
          <Grid item xs={12} sm={3}>
            <FormControl component="fieldset">
              <RadioGroup row aria-label="position" name="position" defaultValue="addressTarget" onChange={handlerTipoDirTarget}>
                <FormControlLabel
                  value="addressTarget"
                  control={<Radio color="primary" />}
                  label="Dirección"
                  labelPlacement="End"
                />
                <FormControlLabel
                  value="uriLocationTarget"
                  control={<Radio color="primary" />}
                  label="Ubicación"
                  labelPlacement="End"
                />
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={3}>
          </Grid>


          <Grid item xs={12} sm={4}>
            <Controls.Input
              label="Dirección de Entrega"
              name="addressTarget"
              multiline={true}
              fullWidth={true}
              maxRows={2}
              minRows={2}
              variant="outlined"
              className={styles.textFieldMulti2} 
              value={values.addressTarget}
              onChange={handleInputChange}
              error={errors.addressTarget}
              disabled={DisabledDirT}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Select
              name="muniTarget"
              label="Municipio"
              value={values.muniTarget}
              styledisable={false}
              onChange={handleInputChange}
              options={DeliveryService.getMuniCollection()}
              error={errors.muniTarget}
              disabled={DisabledDirT}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Select
              name="zoneTarget"
              label="Zona"
              value={values.zoneTarget}
              styledisable={false}
              onChange={handleInputChange}
              options={DeliveryService.getZoneCollection()}
              error={errors.zoneTarget}
              disabled={DisabledDirT}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Input
              label="Ubicación Destino"
              name="uriLocationTarget"
              className={styles.textField2}
              value={values.uriLocationTarget}
              onChange={handleInputChange}
              error={errors.uriLocationTarget}
              disabled={DisabledLocT}
            />
          </Grid>
          <Grid item xs={12} sm={2}>
            <Controls.Button
              text="Cargar"
              disabled={DisabledLocT}
              onClick={splitcoordsTarget} />
          </Grid>

          <Grid item xs={12} sm={8}>
            <Controls.Input
              label="Indicaciones"
              name="indicationsTarget"
              className={styles.textField}
              value={values.indicationsTarget}
              onChange={handleInputChange}
              error={errors.indicationsTarget}
            />
            <div>
              <Controls.Button
                type="submit"
                text="Submit" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm} />
            </div>
          </Grid>
          <Grid item xs={12} sm={3}>
            <Typography className={styles.letra} variant="button" display="block" gutterBottom> {coordenadasTargetLat1}{coordenadasTargetLng1}</Typography>
          </Grid>
          <Grid item xs={12} sm={1}>
            {coordenadasTargetLng1 !== 0 ?(<CheckCircleIcon color='secondary' fontSize='small'/>): (<></>)}
          </Grid>
         </Paper>

        </Grid>
      </Grid>
      </Grid>
      </MuiPickersUtilsProvider>
      </Form>
    </div>

  )
}

export default EntregaForm;