import React,{useState, useEffect} from 'react'
import './Plans.css'
import axios from 'axios';
import { Paper, makeStyles, Typography, Button , Grid , CardContent, ListItem ,  List, ListItemText    } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(1),
        padding: theme.spacing(1),
        width: '15%'
    },
    searchInput: {
        width: '10%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    toolbar: theme.mixins.toolbar,
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 0,
      },
      pos: {
        marginBottom: 12,
      },
      fontdata:{
        fontSize: '10px',  
        color: '#8a9597'
      },
      fontAddress: {
        fontSize: '9px',  
        color:'#0c01ff'
      }
    
}))
const loadPlans = 'http://localhost:3001/api/plan/v2/planall';
const getplans = 'http://localhost:3001/api/plan/v2/planall';
const updateOrden = 'http://localhost:3001/api/plan/v2/updateplan';


const initialTask = [

]


export default function PlansAll() {
    const  [ tasksR, setTasksR ] = useState(initialTask);
    const  [ tasksE, setTasksE ] = useState(initialTask);
    const  [ tasksM1, setTasksM1 ] = useState(initialTask);
    const  [ tasksM2, setTasksM2 ] = useState(initialTask);
    const  [ tasksM3, setTasksM3 ] = useState(initialTask);
    const  [ tasksM4, setTasksM4 ] = useState(initialTask);

const classes = useStyles();

const peticionPlan = async() => {
    await axios.get(`${getplans}`)
    .then(response => {
        console.log(response.data);
        setTasksR(response.data.recolectas);
        setTasksE(response.data.entregas);
        setTasksM1(response.data.moto1);
        setTasksM2(response.data.moto2);
        setTasksM3(response.data.moto3);
        setTasksM4(response.data.moto4);

    })   
}

const LoadPlan = async() => {
    await axios.post(`${loadPlans}`)
    .then(response => {
       console.log(response);
    })

    peticionPlan();   
}

const actualizaPlan = async(deliveryID, action, orden) => {
    const data = {"deliveryID": deliveryID, "action": action, "orden": orden}
    await axios.patch(`${updateOrden}`, data)
    .then(response => {
       console.log(response);
    })   
}

const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

const loadHandlerPlan = () => {
    console.log(tasksR)
    tasksR.forEach((element, index) => {
        console.log(element)
        actualizaPlan(element.deliveryID, element.action, index+1)
    });
    //actualizaPlan()
}

useEffect(()=>{
    peticionPlan();
  },[])

    return (
        <>

            <div className={classes.toolbar}></div>   
            <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
            </Grid>
            <Button variant="outlined" color="primary" disableElevation onClick={LoadPlan}>
                Cargar Servicios
            </Button>
            </Grid>
            <DragDropContext onDragEnd={ (resultR) => 
            {
                const { sourceR, destinationR} = resultR
            if (!destinationR){
                return;
            }
            if(sourceR.index === destinationR.index && sourceR.droppableId === destinationR.droppableId){
                return;
            }
            setTasksR(prevTasks => 
            reorder(prevTasks , sourceR.index, destinationR.index))

            }}>
                <Grid container spacing={2}>
                <Paper className={classes.pageContent}>
                    <Typography>Recolectas</Typography>
                  <Droppable droppableId="TasksRecolecta" key="TasksRecolecta">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksR.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>0</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.direccion.zone}  {task.direccion.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.direccion.municipio}</strong></Typography></Grid>

</Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>

                 </Paper>
                 <Paper className={classes.pageContent}>
                    <Typography>Entregas</Typography>
                  <Droppable droppableId="TasksEntregas" key="TasksEntregas">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksE.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>0</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.direccion.zone}  {task.direccion.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.direccion.municipio}</strong></Typography></Grid></Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                 </Paper>
                 <Paper className={classes.pageContent}>                     
                    <Typography>Moto 1</Typography>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Cargar</Button>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Manual</Button>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Auto</Button>
                  <Droppable droppableId="TasksMoto1" key="TasksMoto1">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksM1.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.orden}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.zone}  {task.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.municipio}</strong></Typography></Grid></Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                 </Paper>
                 <Paper className={classes.pageContent}>
                    <Typography>Moto 2</Typography>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Cargar Moto 2</Button>
                  <Droppable droppableId="TasksMoto2" key="TasksMoto2">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksM2.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.orden}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.zone}  {task.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.municipio}</strong></Typography></Grid></Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                 </Paper>
                 <Paper className={classes.pageContent}>
                    <Typography>Moto 3</Typography>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Cargar Moto 3</Button>
                  <Droppable droppableId="TasksMoto3" key="TasksMoto3">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksM3.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.orden}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.zone}  {task.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.municipio}</strong></Typography></Grid></Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                 </Paper>
                 <Paper className={classes.pageContent}>
                    <Typography>Moto 4</Typography>
                    <Button variant="outlined" color="primary" disableElevation onClick={loadHandlerPlan}>Cargar Moto 4</Button>
                  <Droppable droppableId="TasksMoto4" key="TasksMoto4">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasksM4.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={0}>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{index+1}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.orden}</Typography></Grid>
                                 <Grid item xs={6} sm={1}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.action}</Typography></Grid>
                                 <Grid item xs={6} sm={2}><Typography className={classes.fontdata} variant="caption" display="block" gutterBottom>{task.deliveryID}</Typography></Grid>
                                 <Grid item xs={6} sm={3}><Typography className={classes.fontdata}variant="caption" display="block" gutterBottom>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Typography></Grid>
                                 <Grid item xs={6} sm={4}><Typography className={classes.fontAddress} variant="caption" display="block" gutterBottom><strong>z.{task.zone}  {task.municipio=='Santa Catarina Pinula'?'SC. Pinula':task.municipio}</strong></Typography></Grid></Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                 </Paper>
                 </Grid>
            </DragDropContext>

        </>
    )
}