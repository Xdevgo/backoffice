import React from 'react'
import * as mdIcons from "react-icons/md";
import * as bi from "react-icons/bi";
import * as bs from "react-icons/bs";
import * as im from "react-icons/im";
export const SidebarData = [
    {
        title: 'Inicio',
        path: '/',
        icon: <bi.BiHomeAlt/>,
        cName: 'nav-text',
        enable: true,
        Collapse: false
    },
    {
        title: 'Clientes',    
        icon: <bs.BsInboxes/>,
        cName: 'nav-text',
        enable: true,
        Collapse: false,
        subtitle: 'Parametrización',
        path: '/nuevaentrega',

    },
    {
        title: 'Rutas',    
        icon: <bs.BsInboxes/>,
        cName: 'nav-text',
        enable: true,
        Collapse: false,
        subtitle: 'Parametrización',
        path: '/Plans',

    },
    {
        title: 'Envios',    
        icon: <bs.BsInboxes/>,
        cName: 'nav-text',
        enable: true,
        Collapse: false,
        subtitle: 'Parametrización',
        path: '/NuevaEntregas',

    },
    {
        title: 'Gestión Ruta',    
        icon: <bs.BsInboxes/>,
        cName: 'nav-text',
        enable: true,
        Collapse: false,
        subtitle: 'Parametrización',
        path: '/paramsRuta',

    },
   
];