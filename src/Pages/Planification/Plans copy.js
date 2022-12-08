import React,{useState, useEffect} from 'react'
import './Plans.css'

import { Paper, makeStyles, Typography  } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
const useStyles = makeStyles(theme => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    searchInput: {
        width: '75%'
    },
    newButton: {
        position: 'absolute',
        right: '10px'
    },
    toolbar: theme.mixins.toolbar,
    
}))

const initialTasks = [
    { id: "1", text: "React.js"},
    { id: "2", text: "HTML/CSS"},
    { id: "3", text: "AWS"},
    { id: "4", text: "Javascripts"}
]



export default function Plans() {
    const  [ tasks, setTasks ] = useState(initialTasks);

const classes = useStyles();


const reorder = (list, startIndex, endIndex) => {
    const result = [...list];
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
  
    return result;
  };

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
                    <ul 
                    {...droppableProvided.droppableProps}
                    ref={droppableProvided.innerRef}
                    className='"task-container'>
                        {tasks.map((task, index) => (
                            <Draggable key={task.id} draggableId={task.id} index={index}>
                            { (draggableProvided) => 
                            <li
                            {...draggableProvided.draggableProps}
                            ref={draggableProvided.innerRef}
                            {...draggableProvided.dragHandleProps}
                             className='task-item' >{task.text}
                             </li>
                             }
                            </Draggable>
                            ))}
                                                {droppableProvided.placeholder}
                    </ul>)}
                    </Droppable>
            </Paper>
            </DragDropContext>

        </>
    )
}