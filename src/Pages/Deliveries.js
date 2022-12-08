import React  , { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
//import { Container, Row, Col } from 'react-grid-system';
import { makeStyles } from '@material-ui/core/styles';
import { Link } from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import {  Link as RouteLink,useHistory} from 'react-router-dom';
  
const baseUrl = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries/bystate/x"





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
      }
  }));


  const Order= props => {
    const styles = useStyles();
    const [data, setData] = useState([]);


      const peticionGet = async() => {
        await axios.get(`${baseUrl}`)
        .then(response => {
           setData(response.data.deliveries);
        })
        
    }

    const history = useHistory();

    useEffect(()=>{
        peticionGet();
    },[])


    const columnas = [
      { title: 'Fecha', field:'createdAt', type: 'date' ,
      dateSetting: {
        format: 'dd/MM/yyyyTHH:mm:ss'
      },},
       // { title: 'Orden', field:'orderID', render:rowData=><Link href={`/${rowData.orderID}/ordendetalle`}>{rowData.orderID}</Link>},
        { title: 'ID', field:'deliveryID', render:rowData=><RouteLink  className={styles.linkS} to={ 
          {
          pathname:`/${rowData.deliveryID}/deliverydetails`
        }} >{rowData.deliveryID}</RouteLink>},
        { title: 'Cliente Origen', field:'name_origin'},
        { title: 'Telefono Origen', field:'phone_origin'},
        { title: 'Cliente Destino', field:'name_target'},
        { title: 'Telefono Destino', field:'phone_target'},
        { title: 'Estado', field:'state_delivery'},
        { title: 'Descripción del Producto', field:'description_product'},
        { title: 'Cantidad', field:'quantity'},
        { title: 'Peso', field:'weight'},
        { title: 'Dimesiones', field:'dimensions'},
        { title: 'Costo', field:'amount'}
      ];



      const seleccionarRepuesto=(repuesto, caso)=>{
        console.log(repuesto.orderID);
        <Link to={`/${repuesto.orderID}/ordendetalle`}></Link>
      }


return (
  <div>
  <React.Fragment>
  <div className={styles.content}>
                <div className={styles.toolbar}></div>                
            </div>
  <div className="container-searchcar">
        <br/>
        <MaterialTable
        columns={columnas}
        data={data}       
        title="Ordenes"
        actions = {[]}
        options={
            {
                actionsColumnIndex:-1,
                pageSize: 10
            }
        }
        localization={{
            header:{
                actions:'Detalle'
            }
        }}
        />
</div>
</React.Fragment>
</div>
);
}

export default Order;