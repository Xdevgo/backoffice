import React  , { useState, useEffect} from 'react';
import MaterialTable from 'material-table';
import axios from 'axios';
//import { Container, Row, Col } from 'react-grid-system';
import { makeStyles } from '@material-ui/core/styles';
import { Link, Typography, Tooltip } from '@material-ui/core';
import DetailsIcon from '@material-ui/icons/Details';
import {  Link as RouteLink,useHistory} from 'react-router-dom';
import { MdStayPrimaryLandscape } from 'react-icons/md';
import Controls from '../components/shared/controls/Controls';
  

//const baseUrl = "http://localhost:3003/api/planification"
const baseUrl = "https://us-central1-xgogt502.cloudfunctions.net/xgoapiplan/api/planification"


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
      newButton: {
        position: 'absolute',
        right: '10px'
    },
  }));


  const Plan= props => {
    const styles = useStyles();
    const [data, setData] = useState([]);
    const [distance, setTdistance] = useState(0);
    const [duration, setTduration] = useState(0);
    const [durationtraffic, setTdurationtraffic] = useState(0);


      const peticionGet = async() => {
        await axios.get(`${baseUrl}`)
        .then(response => {
           setData(response.data.plan);
           setTdistance(response.data.totaldistance);
           setTduration(response.data.totalduration);
           setTdurationtraffic(response.data.totalduration_in_traffic);
           console.log(response.data.plan);
        })
        
    }


    const habldePlan = async() => {

    
      
          const Planificacion = "https://us-central1-xgogt502.cloudfunctions.net/xgoapiplan/api/planification/initial" 
      
          const headers = {
            'Content-Type': 'application/json'
          }
      
       try{
          const resp = await axios ({
            url: Planificacion,
            headers: headers,
            timeout: 18000,
            method: 'PUT'
          })

          alert("Plan" + resp.data.length)
      
          }catch(e){
            console.log(e);
        
      
        };
        
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
      { title: 'Orden', field:'orden'},
        { title: 'Guia ', field:'deliveryID', render:rowData=><RouteLink  className={styles.linkS} to={ { pathname:`/${rowData.deliveryID}/deliverydetails`}}>
          {rowData.deliveryID}</RouteLink>},
        { title: 'Acción', field:'type',
        render: rowData => {return rowData.type === 'O'? 'Recolectar':'Entregar'}
      },
       // { title: 'State', field:'state'},


        { title: 'Proxima Guia', field:'deliveryDestino'},
        { title: 'Proxima Acción', field:'typeDestino',
        render: rowData => {return rowData.typeDestino === 'O'? 'Recolectar':'Entregar'}
      },
        { title: 'Dirección', field: 'direccion_destino.address',
      render: rowData => {return rowData.type === 'O'? rowData.direccion_origen.address:rowData.direccion_destino.address}},
      { title: 'Distancia', field:'googledata.distance.text',
      render: rowData => {return rowData.googledata === undefined ? '0 km': rowData.googledata.distance.text}},
      { title: 'Duración', field:'googledata.duration.text',
      render: rowData => {return rowData.googledata === undefined ? '0 min': rowData.googledata.duration.text}},
     // { title: 'Duración con trafico', field:'googledata.duration_in_traffic.text',
     // render: rowData => {return rowData.googledata === undefined ? '0 min': rowData.googledata.duration_in_traffic.text}},
      //{ title: 'Lng', field: 'direccion_destino.location.coordinates[0]',
      //render: rowData => {return rowData.type === 'O'? rowData.direccion_origen.location.coordinates[1]:rowData.direccion_destino.location.coordinates[1]}},
      //{ title: 'Lat', field: 'direccion_destino.location.coordinates[1]',
      //render: rowData => {return rowData.type === 'O'? rowData.direccion_origen.location.coordinates[0]:rowData.direccion_destino.location.coordinates[0]}},


        { title: 'Location ', render:rowData=>
        
        <RouteLink  className={styles.linkS} 
        to={ 
          rowData.type === 'O'?
          { pathname:`/map/${rowData.direccion_origen.location.coordinates=== undefined ? 1 :rowData.direccion_origen.location.coordinates[1]}/${rowData.direccion_origen.location.coordinates=== undefined ? 1 :rowData.direccion_origen.location.coordinates[0]}`}
          :
          { pathname:`/map/${rowData.direccion_destino.location.coordinates=== undefined ? 1 :rowData.direccion_destino.location.coordinates[1]}/${rowData.direccion_destino.location.coordinates=== undefined ? 1 :rowData.direccion_destino.location.coordinates[0]}`}
         
          }>
          
              {rowData.type === 'O'? rowData.direccion_origen.location.coordinates[1]:rowData.direccion_destino.location.coordinates[1]},
              {rowData.type === 'O'? rowData.direccion_origen.location.coordinates[0]:rowData.direccion_destino.location.coordinates[0]}
        </RouteLink>},

{ title: 'Estado', field: 'state',
render: rowData => {return rowData.state === 'IR'? 'Recolectado':rowData.state === 'C'? 'Calendarizado':rowData.state === 'CR'? 'A Recolectar':
                           rowData.state === 'R'? 'Recolectado':rowData.state === 'CE'? 'A Entregar':rowData.state === 'E'? 'Entregado':'Desconocido'}},

       {/* title: 'Ubicación ',  render:rowData=>
        <RouteLink className={styles.linkS}  
        to={`/map/${rowData.direccion[0].location.coordinates=== undefined ? 1 :rowData.direccion[0].location.coordinates[1]}/${rowData.direccion[0].location.coordinates=== undefined ? 1 :rowData.direccion[0].location.coordinates[0]}`}>
        {rowData.direccion[0].location.coordinates=== undefined ? 1 :rowData.direccion[0].location.coordinates[1]},
        {rowData.direccion[0].location.coordinates=== undefined ? 1 :rowData.direccion[0].location.coordinates[0]}
      </RouteLink>*/},
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
                <Tooltip title="Generar Plan">
                      <Controls.Button
                        text="Generar planificación "
                        variant="outlined"
                      

                        className={styles.newButton}
                        onClick={habldePlan}
                    />
                    </Tooltip>           
            </div>
            <Typography color="blue"> Distancia Total en Km: {distance} km</Typography>
            <Typography color="blue">Duración Total en Horas: {duration} hr</Typography>
            <Typography color="blue">Duración Total en Trafico Horas:  {durationtraffic} hr</Typography>

  <div className="container-searchcar">
        <br/>
        <MaterialTable
        columns={columnas}
        data={data}       
        title="Planificación"
        actions = {[]}
        options={
            {
                actionsColumnIndex:-1,
                pageSize: 80
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

export default Plan;