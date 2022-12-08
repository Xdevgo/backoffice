import React  , { useState, useEffect} from 'react';
import '../App.css';
import MaterialTable from 'material-table'
import axios from 'axios';
import { useHttpClient } from '../components/shared/http-hook';

import { makeStyles,createMuiTheme } from '@material-ui/core/styles';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';

import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import accounting from "accounting";
import Link from '@material-ui/core/Link';
import ReceiptIcon from '@material-ui/icons/Receipt';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import PaymentIcon from '@material-ui/icons/Payment';
import Tooltip from '@material-ui/core/Tooltip';
import Fab from '@material-ui/core/Fab';
import { useParams,useLocation, Link as RouteLink } from 'react-router-dom';


import * as Estados  from '../components/shared/EstadosEnvios';

function Copyright() {
  return (
    <Typography variant="caption" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/" >
        Family X Guatemala 
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}


const baseUrl = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries"

const theme = createMuiTheme   ({
  palette:{
    primary:{
        main :'#414141'
    },
    secondary:{
        main :'#1a83ff'
    }
},
  typography: {
      caption: {
       //fontFamily: 'Courier',
       fontFamily: 'Courier',
       lineHeight: 1.1,
       fontSize:10,
      },
      subtitle2: {
          //fontFamily: 'Courier',
          fontFamily: 'Courier',
         }
  },
  });

const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(0, 0),
    fontFamily: "Courier"
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(0),
    marginBottom: theme.spacing(0),
    
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(0),
    marginRight: theme.spacing(0),
    [theme.breakpoints.up(10 + theme.spacing(0) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
},
photo: {
  height: 60,
  width: 60,
  padding: 0
},
grid:{
  padding:0,
},
button: {
  marginTop: theme.spacing(3),
  marginLeft: theme.spacing(1),
},
extendedIcon: {
  marginRight: theme.spacing(1),
},


  
}));


function OrderDetails() {
  const classes = useStyles();

  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const envio = query.getAll('rowData');
  console.log(envio)
  const envioObject  = JSON.parse(envio);
  return (
       <main  className={classes.layout}>
        <br></br>
        <br></br>
        <br></br>
    <Paper id='orderHTML' className={classes.paper} variant="outlined" square={false} >
    <React.Fragment>
      <Grid container spacing={1} className={classes.grid}>
        <Grid item xs={12} sm={6}>
        <Typography variant="h5" align="left" color="primary">GUIA: {envioObject.area}-{envioObject.deliveryID}</Typography>
    
        </Grid>
        <Grid item xs={12} sm={6} Width={true} className={classes.grid}>
        <Typography  variant="caption" align="left" color="primary"><b>Fecha Creación: </b>{new Date(envioObject.createdAt).toLocaleDateString('es-gt')}</Typography>
        <br></br>  
        <Typography  variant="caption" align="left" color="primary"><b>Status: </b>{Estados.EstadosEnvios(envioObject.state_delivery)}</Typography>  
</Grid>

        <Grid item container direction="column" xs={12} sm={6} >
        <Typography variant="subtitle2" gutterBottom className={classes.title}>
        <b>Datos de Recolección</b>
          </Typography>          
        </Grid>
      
      <Grid item container direction="column" xs={12} sm={12}>
      <Typography  variant="caption" align="left" color="primary"><b>No. Cliente: </b>{envioObject.clientID}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Nombre: </b>{envioObject.customers1.name}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Telefono: </b>{envioObject.customers1.phone}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Dirección: </b>{envioObject.customers1.address}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Zona/Municipio: </b>{envioObject.customers1.zone} {envioObject.customers1.municipio}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Indicaciones: </b>{envioObject.customers1.indications}</Typography>
      
      <Typography  variant="caption" align="left" color="primary"><b>Cuenta deposito: </b>{envioObject.customers1.bank} - {envioObject.customers1.nameacount} - {envioObject.customers1.typeacount} - {envioObject.customers1.noacount}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Locación origen: </b>     
      <RouteLink to={`/map/${envioObject.customers1.location.coordinates=== undefined ? 1 :envioObject.customers1.location.coordinates[1]}/${envioObject.customers1.location.coordinates=== undefined ? 1 :envioObject.customers1.location.coordinates[0]}`}>
      {envioObject.customers1.location.coordinates[1]},{envioObject.customers1.location.coordinates[0]}
      </RouteLink>
      </Typography>
      </Grid>


      <Grid item container direction="column" xs={12} sm={6} >
<Typography variant="subtitle2" gutterBottom className={classes.title}>
<b>Datos del Paquete</b>
  </Typography>          
</Grid>
<Grid item container direction="column" xs={12} sm={12}>


<Typography  variant="caption" align="left" color="primary"><b>Fecha Creación: </b>{envioObject.createdDate}</Typography>
<Typography  variant="caption" align="left" color="primary"><b>Fecha de Entrega: </b>{envioObject.schedulingDate}</Typography>
<Typography  variant="caption" align="left" color="primary"><b>Hora Entrega: </b>{envioObject.horaindicaciones === 'D'?'Despues de '+ envioObject.schedulingTime : envioObject.horaindicaciones === 'A'? 'Antes de '+envioObject.schedulingTime: 'Exacto a las '+envioObject.schedulingTime }</Typography>

      <Typography  variant="caption" align="left" color="primary"><b>Descripción del producto: </b>{envioObject.description_product}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Cantidad: </b>{envioObject.quantity}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Peso: </b>{envioObject.weight} lb</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Dimesiones: </b>{envioObject.dimensions} cm³</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Monto: </b> {accounting.formatMoney(envioObject.amount, "GTQ ")}</Typography>
      </Grid>

<Grid item container direction="column" xs={12} sm={6} >
<Typography variant="subtitle2" gutterBottom className={classes.title}>
<b> Datos de Entrega</b>
  </Typography>          
</Grid>
<Grid item container direction="column" xs={12} sm={12}>
      <Typography  variant="caption" align="left" color="primary"><b>Id Cliente entrega: </b>{envioObject.clientSubID}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Nombre: </b>{envioObject.customers2.name}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Telefono: </b>{envioObject.customers2.phone}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Dirección: </b>{envioObject.customers2.address}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Zona/Municipio: </b>{envioObject.customers2.zone} {envioObject.customers2.municipio}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Indicaciones: </b>{envioObject.customers2.indications}</Typography>      
      <Typography  variant="caption" align="left" color="primary"><b>Cuenta deposito: </b>{envioObject.customers2.bank} - {envioObject.customers2.nameacount} - {envioObject.customers2.typeacount} - {envioObject.customers2.noacount}</Typography>
      <Typography  variant="caption" align="left" color="primary"><b>Locación destino: </b>     
      <RouteLink to={`/map/${envioObject.customers2.location.coordinates=== undefined ? 1 :envioObject.customers2.location.coordinates[1]}/${envioObject.customers2.location.coordinates=== undefined ? 1 :envioObject.customers2.location.coordinates[0]}`}>
      {envioObject.customers2.location.coordinates[1]},{envioObject.customers2.location.coordinates[0]}
      </RouteLink>
      </Typography>
      </Grid>


      </Grid>
      <br></br>

      </React.Fragment> 
      <Copyright />
      </Paper>
      <React.Fragment>
                <div>
                <Tooltip title="Enviar por Correo la Factura" aria-label="Email">
                <Fab variant="extended" color="primary" aria-label="Email" className={classes.margin}>
                <MailOutlineIcon className={classes.extendedIcon} />
                  Email
                </Fab>
                </Tooltip>
                </div>
              </React.Fragment>
              
      </main>

  );
}

export default OrderDetails;