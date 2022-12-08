import React,{useState, useEffect} from 'react'
import './Plans.css'
import axios from 'axios';
import { Paper, makeStyles, Typography, Button , Grid , CardContent, ListItem ,  List, ListItemText    } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
        width: '20%'
    },
    searchInput: {
        width: '10%'
    },
    newButton: {
        position: 'absolute',
        right: '8px'
    },
    toolbar: theme.mixins.toolbar,
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 10,
      },
      pos: {
        marginBottom: 12,
      },
    
}))

const getplans = 'http://localhost:3001/api/plan/v2/plan';
const updateOrden = 'http://localhost:3001/api/plan/v2/updateplan';

const initialTasks = [
    { id: "1", text: "React.js"},
    { id: "2", text: "HTML/CSS"},
    { id: "3", text: "AWS"},
    { id: "4", text: "Javascripts"}
]



export default function Plans() {
    const  [ tasks, setTasks ] = useState(initialTasks);

const classes = useStyles();

const peticionPlan = async() => {
    await axios.get(`${getplans}`)
    .then(response => {
        setTasks(response.data.plan);
       console.log(response.data.plan);
    })   
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
    console.log(tasks)
    tasks.forEach((element, index) => {
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
            <DragDropContext onDragEnd={ (result) => 
            {
                const { source, destination} = result
            if (!destination){
                return;
            }
            if(source.index === destination.index && source.droppableId === destination.droppableId){
                return;
            }
        setTasks(prevTasks => 
            reorder(prevTasks , source.index, destination.index))

            }}>
                <Paper className={classes.pageContent}>
                    <Typography>Planificación</Typography>
                  <Droppable droppableId="Tasks">
                    {
                    (droppableProvided) => (
                    <List  
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasks.map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                            { (draggableProvided) => 
                            <ListItem 
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item'>
                                 <Grid container spacing={2}>
                                 <Grid item xs={6} sm={1}>{index+1}</Grid>
                                 <Grid item xs={6} sm={1}>{task.orden}</Grid>
                                 <Grid item xs={6} sm={3}>{task.deliveryID}</Grid>
                                 <Grid item xs={6} sm={3}>{(task.action==='O'? 'Recolecta':'Entrega')}</Grid>
                                 <Grid item xs={6} sm={4}>{task.state_delivery==='I'?'Ingresado':task.state_delivery==='E'?'Entregado':task.state_delivery==='R'?'Recolectado':task.state_delivery==='CR'?'Camino A recolectar':task.state_delivery==='CE'?'Camino A recolectar':''}</Grid>
                                 <Grid item xs={6} sm={12}>{task.address}</Grid>
                            </Grid>
                             </ListItem>                             
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </List >)}
                    </Droppable>
                <Button variant="contained" color="primary" disableElevation onClick={loadHandlerPlan}>
                Cargar Plan
                </Button>
            </Paper>
            </DragDropContext>

        </>
    )
}