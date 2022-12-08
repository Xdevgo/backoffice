import React from "react";
import Homepage from "../dnd/pages/Homepage";
import Header from "../dnd/components/Header";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from 'react-dnd-html5-backend'

const PlanAllv2 = () => {
    return (

        <DndProvider backend={HTML5Backend}>
                    <br></br>
                    <br></br>
                    <br></br>
            <Header />
            <Homepage />
        </DndProvider>
    );
};

export default PlanAllv2;