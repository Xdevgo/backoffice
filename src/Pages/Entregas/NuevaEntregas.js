import React  , { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
//import { Container, Row, Col } from 'react-grid-system';
import { makeStyles } from '@material-ui/core/styles';
import { Link , Grid, Dialog, Typography, Slider, TextField, RadioGroup, Radio, FormControlLabel, Paper, FormControl, Select , InputLabel } from '@material-ui/core';
import Controls from '../../components/shared/controls/Controls';
import { Alert, AlertTitle } from '@material-ui/lab';
import DetailsIcon from '@material-ui/icons/Details';
import {  Link as RouteLink,useHistory} from 'react-router-dom';
import * as Estados  from '../../components/shared/EstadosEnvios'; 
import DateFnsUtils from '@date-io/date-fns';
import * as DeliveryService from '../../services/DeliveryService';
import { useForm, Form } from '../../components/shared/useForm';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import EventAvailableIcon from '@material-ui/icons/EventAvailable';
import { Sync } from '@material-ui/icons';



const baseUrl = "http://localhost:3001/api/deliveries/v2/services"
const getServicesByDate = "http://localhost:3001/api/deliveries/v2/services"
const cancelService = "http://localhost:3001/api/deliveries/v2/services"

const headers = {
  'Content-Type': 'application/json'
}



const useStyles = makeStyles((theme) => ({
    iconos:{
      cursor: 'pointer'
    }, 
    inputMaterial:{
      width: '60%'
    },
    table:{
      paddingLeft:'20px'
    },  
    modal: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)'
    },
    inputMaterial:{
      width: '100%'
    },
    toolbar: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(3),
      },
      linkS:{
        textDecoration: 'none',
        color:theme.palette.secondary.main
      },
      paper: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(1),
        borderRadius: 5,
        display: 'flex',
        //flexWrap: 'wrap',
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
      time: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(2),
        width: 210,
      },
      date: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
      },
  }));

  const initialFValues = {    
    area : '',
    deliveryID: 0,
    schedulingDate: new Date().toLocaleDateString('en-GT'),
    schedulingTime: '',
    horaindicaciones : '',
    amount: 0,
    quantity: 0,
    product: '',
    state_delivery: ''
  }



  const NuevaEntregas= props => {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);
    const [selectedDate, setSelectedDate] = React.useState(new Date().toLocaleDateString('en-GT'));
    const [statusAlert, setStatusAlert] = useState("Info")
    const [msjAlert, setMsjAlert] = useState("")
    const [openPopup3, setOpenPopup3] = useState(false)
    const [selectedDate2, setSelectedDate2] = React.useState( new Date().toLocaleDateString('en-GT'));
    const [selectedTime, setselectedTime] = React.useState('')
    const [selectedState2, setSelectedState2] = useState("")
    const [valores, setValores] =  useState(initialFValues);



      const peticionGet = async() => {
        await axios.get(`${baseUrl}`)
        .then(response => {
           setData(response.data.services);
           console.log(response.data.services);
        })
        
    }

    const peticionGetByDate = async(date) => {
      await axios.get(`${getServicesByDate}/`+date)
      .then(response => {
         setData(response.data.services);
         console.log(response.data.services);
      })
      
  }




    const handlerEdit= async(data) => {
      console.log(data.area)
      console.log(data.deliveryID)
      await axios.patch(`${cancelService}/${data.area}/${data.deliveryID}/C`)
      .then(response => {
         setData(response.data.messages);
         if(response.data.message.modifiedCount > 0){
          setOpenPopup3(true)
          setStatusAlert("Success")
          setMsjAlert("existosa!")
           }else{
            setOpenPopup3(true)
            setStatusAlert("Error")
            setMsjAlert("fallida...")
           }
         peticionGetByDate(new Date(selectedDate).toISOString());
      })
  }

  const handlerCancel= async(data) => {
    console.log(data.area)
    console.log(data.deliveryID)
    await axios.patch(`${cancelService}/${data.area}/${data.deliveryID}/X`)
    .then(response => {
       setData(response.data.messages);
       if(response.data.message.modifiedCount > 0){
        setOpenPopup3(true)
        setStatusAlert("Success")
        setMsjAlert("existosa!")
         }else{
          setOpenPopup3(true)
          setStatusAlert("Error")
          setMsjAlert("fallida...")
         }
       peticionGetByDate(new Date(selectedDate).toISOString());
    })
}

const handleDateChange = (date) => {
  console.log(date)
  peticionGetByDate(date.toISOString());
  setSelectedDate(date);
};


const handleClose = () => {
  setOpenPopup3(false);
};

const handleUpdateDelivery = async(e) => {
  console.log(e)

const dataUpdate = {
"area":  e.area,
"deliveryID": e.deliveryID,
"amount": valores.amount !== 0 ? valores.amount: e.amount,
"horaindicaciones": valores.horaindicaciones !== '' ? valores.horaindicaciones: e.horaindicaciones,
"product": valores.product !== 0 ? valores.product: e.description_product,
"quantity": valores.quantity !== 0 ? valores.quantity: e.quantity,
"schedulingDate": valores.schedulingDate !== '' ? valores.schedulingDate: e.schedulingDate,
"schedulingTime": valores.schedulingTime !== '' ? valores.schedulingTime: e.schedulingTime,
"state_delivery": valores.state_delivery !== '' ? valores.state_delivery: e.state_delivery,
   
};
try{
 const resp = await axios ({
   url: cancelService,
   headers: headers,
   method: 'PATCH',
   data: dataUpdate,
 })
 console.log(resp)
if(resp.data.message.modifiedCount > 0){
setOpenPopup3(true)
setStatusAlert("Success")
setMsjAlert("existosa!")
 }else{
  setOpenPopup3(true)
  setStatusAlert("Error")
  setMsjAlert("fallida...")
 }
 peticionGet();
 }catch(e){
   console.log(e);         
};
peticionGetByDate(new Date(selectedDate).toISOString());
  
}

const handlerHora = (event) => {
  console.log(event.target.value)
  valores.horaindicaciones = event.target.value
      
   }

const handleEstadoDelivery = e => {
  let valor = e.target.value
  console.log(valor)
  valores.state_delivery = valor
  console.log(valores)
}

const handleDateDelivery = e => {
  let dateSchude = e.target.value
  console.log(dateSchude)
  valores.schedulingDate = dateSchude
  console.log(valores)
}

const handleTimeChange = e => {
  let Time = e.target.value
  console.log(Time)
  valores.schedulingTime = Time
  console.log(valores) 
}

const handleQuantity = e => {
  let quantity = e.target.value
  console.log(quantity)
  valores.quantity = quantity
  console.log(valores) 
}

const handleProduct = e => {
  let product = e.target.value
  console.log(product)
  valores.product = product
  console.log(valores) 
}

const handleAmount = e => {
  let amount = e.target.value
  console.log(amount)
  valores.amount = amount
  console.log(valores) 
}

const handleClick = async(togglePanel, e) => {
setValores(initialFValues)
console.log(e)

  valores.area = e.area
  valores.deliveryID = e.deliveryID
  valores.schedulingDate= e.schedulingDate
  valores.schedulingTime= e.schedulingTime
  valores.horaindicaciones =  e.horaindicaciones
  valores.amount=  e.amount
  valores.quantity=  e.quantity
  valores.product=  e.description_product
  valores.state_delivery= e.state_delivery


console.log(valores)
togglePanel()


}
    useEffect(()=>{
      peticionGetByDate(new Date(selectedDate).toISOString());
    },[])


    const columnas = [
      { title: 'Guia', field:'deliveryID', render:rowData=>
      <RouteLink  className={styles.linkS} 
      to={{
        pathname:`/deliverydetails`,
        search: `rowData=${JSON.stringify({ ...rowData })}` 
        }}>
      {rowData.area+'-'+rowData.deliveryID}
      </RouteLink>, editable: 'never' , filtering: false },
      { title: 'Fecha entrega', field:'schedulingDate', type: 'date' ,
      dateSetting: {
        format: 'dd/MM/yyyyTHH:mm:ss'
      },},
      { title: 'Hora', render:rowData=> rowData.horaindicaciones === 'D'?'Despues '+ rowData.schedulingTime : rowData.horaindicaciones === 'A'? 'Antes '+rowData.schedulingTime: 'Exacto '+rowData.schedulingTime },
     // { title: 'Estado', render:rowData => Estados.EstadosEnvios(rowData.state_delivery),  editable: 'onUpdate'},
     { title: 'Estado', 
     field: 'state_delivery',
     lookup: { 'I': 'Ingresado', 'C': 'Calendarizado', 'CR': 'Camino Recolectar', 'R': 'Recolectado', 'B': 'Bodega', 'CE': 'Camino a Entregar',  'E': 'Entregado', 'ER': 'En Reserva', 'D': 'Depositado','X':'Cancelado','':'Error' },},
      { title: 'Duración', render:rowData => rowData.duracion !== undefined ? (rowData.duracion/60).toFixed(2)+' min':''},
      { title: 'Duración Trafico', render:rowData => rowData.contrafico !== undefined ? (rowData.contrafico/60).toFixed(2)+' min':''},
      { title: 'Distancia', render:rowData => rowData.distancia !== undefined ? (rowData.distancia/1000).toFixed(2)+' km':''},
      { title: 'Zona/Municipio Origen',  render:rowData=> 'z.'+rowData.customers1.zone+' '+ rowData.customers1.municipio},
      { title: 'Zona/Municipio Destino',render:rowData=> 'z.'+rowData.customers2.zone+' '+ rowData.customers2.municipio},
       // { title: 'Orden', field:'orderID', render:rowData=><Link href={`/${rowData.orderID}/ordendetalle`}>{rowData.orderID}</Link>},
        { title: 'Cliente Origen', field:'customers1.name', filtering: false },
        { title: 'Cliente Destino', field:'customers2.name', filtering: false },
        //{ title: 'Cantidad', field:'quantity'},
        { title: 'Descripción', field:'description_product',filtering: false },
        { title: 'Costo', render:rowData => ' Q'+rowData.amount,       
        editComponent: props => (
          <input
            type="text"
            value={props.value}
            onChange={e => props.onChange(e.target.value)}
          />
        )},
      ];



  /*    const seleccionarRepuesto=(repuesto, caso)=>{
        console.log(repuesto.orderID);
        <Link to={`/${repuesto.orderID}/ordendetalle`}></Link>
      }*/


return (
  <div>
  <React.Fragment>
  <div className={styles.content}>             
            </div>
  <div className="container-searchcar">
        <br/>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid container justifyContent="space-around">
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="dd/MM/yyyy"
          margin="normal"
          id="date-picker-inline"
          label="Fecha"
          value={selectedDate}
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

      </Grid>
    </MuiPickersUtilsProvider>

        <MaterialTable
        columns={columnas}
        data={data}       
        title="Envios"
        actions={[
          {
            icon: () => <EventAvailableIcon/>,
            tooltip: 'Actualizar Guia',
            onClick: (event, rowData) => handlerEdit(rowData)
          },
          {
            icon: 'clear',
            tooltip: 'Cancelar Guia',
            onClick: (event, rowData) => handlerCancel(rowData)
          }
        ]}
        //onRowClick={((evt, selectedRow) => setSelectedRow(selectedRow.tableData.id))}
        options={
            {
                filtering: true,
                actionsColumnIndex:-1,
                pageSize: 25,
                headerStyle: {
                  backgroundColor: '#00377b',
                  color: '#FFF',
                  "&:hover": {
                    color: 'rgb(0, 200, 255)'
                  },
                  fontSize: 13,
                },
                rowStyle: rowData => ({
                  backgroundColor: (selectedRow === rowData.tableData.id) ? '#ebfbff' : '#FFF',
                  color: '#123c58',
                  fontSize: 12,
                  maxHeight: '0%'
                })
            }
        }
        localization={{
            header:{
                actions:'Acciones'
            }
        }}
        detailPanel={[ 
          rowData =>  (
         {tooltip: 'Edit',
         disabled: !rowData.expandable,
          render: () =>
           {     
                
          return (
            <div className={styles.root}>
            {/**<Form onSubmit={handleUpdateDelivery} >*/}
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container  spacing={0}>
            <Paper className={styles.paper} variant="outlined" square>
            
            <Grid item xs={12} sm={3}>
            <Controls.Select 
              name="state_delivery"
              label="Estados"
              className={styles.selectField}
              defaultValue={rowData.state_delivery}
              id={valores.state_delivery}
              onChange={handleEstadoDelivery}
              options={DeliveryService.getEstadosDelivery()}
            />
          </Grid>
              <Grid item xs={12} sm={3}>
              <TextField
                id="schedulingDate"
                label="Fecha Entrega"
                type="date"
                defaultValue={new Date(rowData.schedulingDate).toLocaleDateString('en-CA')}
                className={styles.textFieldDate}
                onChange={handleDateDelivery}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              </Grid>
              <Grid item xs={12} sm={2}>
              <TextField
            id="time"
            label="Hora"
            type="time"
            defaultValue={valores.schedulingTime === ''? rowData.schedulingTime: valores.schedulingTime}
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
              <Grid item xs={12} sm={5}>
                <FormControl component="fieldset">
                  <RadioGroup row aria-label="position" className={styles.Radio} name="position" defaultValue={rowData.horaindicaciones} onChange={handlerHora}>
                    <FormControlLabel
                      value="A"
                      control={<Radio color="primary" />}
                      label="Antes"
                    />
                    <FormControlLabel
                      value="E"
                      control={<Radio color="primary" />}
                      label="Exacto"
                    />
                    <FormControlLabel
                      value="D"
                      control={<Radio color="primary" />}
                      label="Despues"
                    />
                  </RadioGroup>
                </FormControl>
              </Grid>
    
              <Grid item xs={12} sm={1}>
                <Controls.Input
                  label="Cant."
                  name="quantity"
                  defaultValue={valores.quantity === ''? rowData.quantity: valores.quantity}
                  className={styles.textField}
                  onChange={handleQuantity}
                />
              </Grid>
              <Grid item xs={12} sm={3}>
                <Controls.Input
                  label="Descripción Producto"
                  name="product"
                  defaultValue={valores.product === ''? rowData.description_product: valores.product}
                  className={styles.textField}
                  onChange={handleProduct}               
                />
              </Grid>
              <Grid item xs={12} sm={2}>    
                <Controls.Input
                  label="Total"
                  name="amount"
                  defaultValue={valores.amount === ''? rowData.amount: valores.amount}
                  className={styles.textField}
                  onChange={handleAmount}  
                />
              </Grid>
              <Grid item xs={12} sm={4}>
              <Controls.Button
                type="submit"
                text="Actualizar Guia" 
                onClick={() => handleUpdateDelivery(rowData)}/>
                
        </Grid>
        <Typography>{rowData.deliveryID}</Typography>
              </Paper>
              </Grid>
              </MuiPickersUtilsProvider>
              
             {/**</Form> */} 
    </div>
          )
        }
        })]}
        onRowClick={(event, rowData, togglePanel) => handleClick(togglePanel, rowData) }
        />
        <Dialog
        open={openPopup3}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title">
        <Alert severity={statusAlert}>
         <AlertTitle>{statusAlert}</AlertTitle>
         Guia actualizada de forma {msjAlert}
        </Alert>
      </Dialog>
</div>
</React.Fragment>
</div>
);
}

export default NuevaEntregas;