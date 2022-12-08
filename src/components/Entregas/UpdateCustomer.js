import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography, Slider, Radio, RadioGroup, FormControlLabel, FormControl, FormGroup, Checkbox,Paper  } from '@material-ui/core';
import { useForm, Form } from '../shared/useForm';
import Controls from '../shared/controls/Controls';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';


import 'date-fns';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
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
      color: '#044496',
      fontSize: '1rem',
      
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
      color: '#044496',
      fontSize: '1rem',
      
    },
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
      color: '#044496',
      fontSize: '1rem',
      
    },
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
    display: 'flex',
    flexWrap: 'wrap',
    borderRadius: 5,
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
  createDate: new Date().toLocaleDateString('en-GT'),
  schedulingDate: new Date().toLocaleDateString('en-GT'),
  schedulingTime: '08:00',
  horaindicaciones : 'D',
  amount: '',
  weight: 5,
  dimensions: 10,
  quantity: '',
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



const UpdateCustomer = (props) => {
  console.log("UpdateCustomer ---")
  const styles = useStyles();

  const { addOrEdit, recordForEdit, recordForUpdate ,setTitle } = props
  const [DisabledDirO, setDisabledDirO] = useState(false)
  const [DisabledLocO, setDisabledLocO] = useState(true)
  const [DisabledBank, setDisabledBank] = useState(false)
  const [disable , setDisable] = useState(false)
  const [stateBank, setStateBank,] = useState(false)
 const [coordenadasLat1, setcoordenadasLat] = useState(0)
  const [coordenadasLng1, setcoordenadasLng] = useState(0)
//new Date().toLocaleDateString()


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



  useEffect(() => {
    console.log("USEREFFECT")
    if (recordForUpdate != null){
      console.log(recordForUpdate)
      setValues({
        ...recordForUpdate
      })
      setDisable(false)
      setcoordenadasLat(recordForUpdate.coordenadasLat1)
      setcoordenadasLng(recordForUpdate.coordenadasLng1)
      setTitle("Actualizar Cliente")
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
        <Paper className={styles.paper} variant="outlined" square >
            <Grid item xs={12} sm={2}>
            <Controls.Input
              label="Telefono Cliente"
              name="mobileClient"
              className={styles.textField}
              value={values.mobileClient !== 0 ? values.mobileClient : ''}
              onChange={handleInputChange}
              error={errors.mobileClient}
              //helperText="Some important text"
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
              className={styles.textFieldMulti}
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
              className={styles.selectField}
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
              className={styles.selectField}
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
              className={styles.textField}
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
            <Typography className={styles.letra} variant="button" display="block" gutterBottom> {coordenadasLat1}{coordenadasLng1}</Typography>
          </Grid>
          <Grid item xs={12} sm={1}>
            {coordenadasLng1 !== 0 ?(<CheckCircleIcon color='secondary' fontSize='small'/>): (<></>)}
            </Grid>


            <Grid item xs={12} sm={3}>
            <Controls.Select
              name="bank"
              label="Banco"
              value={values.bank}
              className={styles.selectField}
              styledisable={disable}
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
              className={styles.selectField}
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
              className={styles.textField}
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
              className={styles.textField}
              value={values.nameacount !== 0 ? values.nameacount : ''}
              onChange={handleInputChange}
              error={errors.nameacount}
              disabled={DisabledBank}
            />
          </Grid>
          </Paper>
        </Grid>
        <Grid container justifyContent="flex-start" spacing={0}>
          <Grid item xs={12} sm={12}>
            <div>
              <Controls.Button
                type="submit"
                text="Actualizar" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm} />
            </div>
          </Grid>

        </Grid>
      </Grid>
      </Grid>
      </MuiPickersUtilsProvider>
      </Form>
    </div>

  )
}

export default UpdateCustomer;