import React,{useState, useEffect} from 'react'
import './Plans.css'
import { Paper, makeStyles, Typography  } from '@material-ui/core';
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import axios from 'axios';

const { v4: uuidv4 } = require('uuid');
const getplans = 'http://localhost:3001/api/plan/v2/planall';
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
    toolbar: {
        margin: theme.spacing(10), 
    }
    
}))
const itemsFromBackend = [
    { id: uuidv4(), content: "First task" },
    { id: uuidv4(), content: "Second task" },
    { id: uuidv4(), content: "Third task" },
    { id: uuidv4(), content: "Fourth task" },
    { id: uuidv4(), content: "Fifth task" }
  ];
  




const onDragEnd = (result, columns, setColumns) => {
   if(!result.destination) return; 
   const { source, destination } = result;
   if(source.droppableId !== destination.droppableId) {
    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];

    const sourceItems = [...sourceColumn.items];
    const destItems = [... destColumn.items];
    const [removed] = sourceItems.splice(source.index, 1);

    destItems.splice(destination.index, 0 , removed);
    setColumns({
        ...columns,
        [source.droppableId]:{
            ...sourceColumn,
            items: sourceItems
        },
        [destination.droppableId]: {
            ...destColumn,
            items: destItems
        }
    })

   }else {   

     const column = columns[source.droppableId];
     const copiedItems = [...column.items];
     const [removed] = copiedItems.splice(source.index, 1);
     copiedItems.splice(destination.index, 0, removed);
     setColumns({
       ...columns,
       [source.droppableId]: {
         ...columns,
         items: copiedItems
       }
     });
    }
}

function Kaban() {

    const classes = useStyles();
    const  [ tasksR, setTasksR ] = useState([]);



      
    const peticionPlan = async() => {
        await axios.get(`${getplans}`)
        .then(response => {
            setTasksR(response.data.recolectas);
    
        })   
    }


    useEffect(()=>{
        peticionPlan();
      },[])


      const [columns, setColumns] = useState({
        [uuidv4()]: {
          name: "Requested",
          items: itemsFromBackend
        },
        [uuidv4()]: {
            name: "To do",
            items: []
          },
          [uuidv4()]: {
            name: "In Progress",
            items: []
          },
          [uuidv4()]: {
            name: "Done",
            items: []
          },
      });


    return (
        <>
        <div className={classes.toolbar}>
       <div style={{display:'flex', justifyContent: 'center', height: '100%' }}>
           <DragDropContext onDragEnd={result => onDragEnd(result, columns, setColumns)}>
           {Object.entries(columns).map(([id, column]) => {
               console.log(column)
                return(
                    <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center"
                      }}>
                        <h2>{column.name}</h2>
                        <div style={{ margin: 8 }}>
                    <Droppable droppableId={id} key={id}>
                        {(provided, snapshot) =>{
                            return(
                                <div
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                style={{
                                    background: snapshot.isDraggingOver
                                    ? "lightblue"
                                    : "lightgrey",
                                  padding: 4,
                                  width: 250,
                                  minHeight: 500
                                }}
                                >

                                {
                                column.items.map((item, index)=> {
                                    return (
                                        <Draggable key={item.id} draggableId={item.id} index={index}>
                                            {(provided, snapshot) => {
                                                return(
                                                    <div 
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                   
                                                       style={{
                                                               userSelect: "none",
                                                               padding: 16,
                                                               margin: "0 0 8px 0",
                                                               minHeight: "50px",
                                                               backgroundColor: snapshot.isDragging
                                                                 ? "#263B4A"
                                                                 : "#456C86",
                                                               color: "white",
                                                               ...provided.draggableProps.style
                                                       }} 
                                                       >
                                                        {item.content}
                                                    </div>
                                                )
                                            }}
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                                </div>
                            )
                        }}
                    </Droppable>
                    </div>
                    </div>
                );
            })}
           </DragDropContext>
       </div>
       </div> 
       </>
    );
}



export default Kaban;