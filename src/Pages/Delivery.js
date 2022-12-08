import React,{useState, useEffect} from 'react'
import DeliveryForm from "../components/DeliveryForm";
import useTable from '../components/useTable';
import * as employeeService from '../services/DeliveryService';
import axios from 'axios';
import Controls from '../components/shared/controls/Controls';
import { Search } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import Popup from "../components/Popup";
import EditOutlinedIcon from '@material-ui/icons/EditOutlined';
import CloseIcon from '@material-ui/icons/Close';
import * as DeliveryService from '../services/DeliveryService';
import Map from '../components/Clients/Map';
import {  Link ,useHistory} from 'react-router-dom';


import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip } from '@material-ui/core';
const getClientes = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/clients" 

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

const headCells = [
    {id: 'actions', label:'Actions', disableSorting: true},
    {id: 'name', label: 'Nombre/Tienda'},
    {id: 'phone', label: 'Telefono'},
    {id: 'address', label: 'Dirección'},
    {id: 'depto', label: 'Departamento'},
    {id: 'municipio', label: 'Municipio'},
    {id: 'zone', label: 'Zona'},
    {id: 'indications', label: 'Indicaciones'},
    {id: 'state_address', label: 'Estado'},
    {id: 'location', label: 'Ubicación'}
]

export default function Delivery() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [deliveryid, setDeliverid]= useState(null);
    const [title, setTitle] = useState(null)
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)

    const [location, SetLocation]=useState({
        lat: "14.4987606",
        lng: "-90.5898538"
      });

    const peticionGet = async() => {
        await axios.get(`${getClientes}`)
        .then(response => {
            console.log(response.data.clientes);
            setRecords(response.data.clientes);
        })
        
    }

    const handleEntrega = async(entrega) => {

        console.log(entrega);
        
        const data = {
            "creator": entrega.creator,
            "name_origin" : entrega.originName,
            "phone_origin" : entrega.mobile,
            "address_origin": {
               "primary" : entrega.addressOrigin,
               "depto": entrega.departmentId,
               "municipio": entrega.muniId,
               "zone": entrega.zoneId,
               "indications": entrega.indications,
               "location": {
                   "lat": "14.4987606",
                   "lng": "-90.5898538"
               },
               "state_origin_address": "I"
            },
            "name_target": entrega.targetName,
            "phone_target" : entrega.mobileTarget,
            "address_target":{
                "primary" : entrega.addressTarget,
               "depto": entrega.departmentIdTarget,
               "municipio": entrega.muniTarget,
               "zone": entrega.zoneIdTarget,
               "indications": entrega.indicationsTarget,
               "location": {
                   "lat": "14.6659202",
                   "lng": "-90.4931797"
               },
               "state_target_address": "I"
            },
            "description_product": entrega.product,
            "quantity": entrega.quantity,
            "amount": entrega.amount,
            "weight": entrega.weight,
            "dimensions": entrega.dimensions,
            "state_delivery": "C"
        };
        
        
            const GeneraEntrega = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries" 
        
            const headers = {
              'Content-Type': 'application/json'
            }
        
         try{
            const resp = await axios ({
              url: GeneraEntrega,
              headers: headers,
              method: 'POST',
              data: data,
            })
            setDeliverid(resp.data.Delivery.deliveryID)
            alert("Tracking ID " + resp.data.Delivery.deliveryID)
        
            }catch(e){
              console.log(e);
          
        
          };
          
        }

    useEffect(() => {
        peticionGet();
    }, []);

    const {
        TblContainer,
        TblHead,
        TblPagination,
        recordsAfterPagingAndSorting
    } = useTable(records,headCells, filterFn);

    const handleSearch = e => {
        let target = e.target;
        setFilterFn({
            fn: items => {
                if (target.value == "")
                    return items;
                else
                    return items.filter(({name, phone}) => name.toLowerCase().includes(target.value.toLowerCase()) || phone.toString().includes(target.value))

                    
            }
        })
    }


    const addOrEdit = (cliente, resetForm) => {

        if (cliente.creator == "0")            
             handleEntrega(cliente)
        else
            handleEntrega(cliente)
        resetForm()
        setRecordForEdit(null)
        setOpenPopup(false)
        //alert(" El numero de entrega es "+ Promise(resolve => deliveryid));
        peticionGet();
    }

    const openInPopup = item => {

    const cliente = {
            creator : item._id,
            originName: item.name,
            mobile: item.phone,
            addressOrigin: item.direccion[0].address,
            departmentId: item.direccion[0].depto,
            muniId: item.direccion[0].municipio,
            zoneId: item.direccion[0].zone,
            indications: item.direccion[0].indications
        }
        setRecordForEdit(cliente)
        setOpenPopup(true)
    }


    return (
        <>
            <div className={classes.toolbar}></div>   
                <Paper className={classes.pageContent}>
                {/*<DeliveryForm />*/}
                <Toolbar>
                <Controls.Input
                        label="Buscar Cliente"
                        className={classes.searchInput}
                        InputProps={{
                            startAdornment: (<InputAdornment position="start">
                                <Search />
                            </InputAdornment>)
                        }}
                        onChange={handleSearch}
                    />
                      <Tooltip title="Ingresar entrega con cliente nuevo">
                      <Controls.Button
                        text="Ingresar Entrega "
                        variant="outlined"
                      

                        startIcon={<AddIcon />}
                        className={classes.newButton}
                        onClick={() => { setTitle('Ingresar entrega con cliente nuevo'); setOpenPopup(true); setRecordForEdit(null); }}
                    />
                    </Tooltip>

                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                           recordsAfterPagingAndSorting().map(item => 
                            (
                                <TableRow key={item.id}>
                                <TableCell>
                                        <Controls.ActionButton
                                            color="blue"
                                            onClick={() => { openInPopup(item) }}>
                                            <AddIcon fontSize="small" />
                                        </Controls.ActionButton>
                                </TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell>{item.direccion[0].address}</TableCell>
                                <TableCell>{item.direccion[0].depto}</TableCell>
                                <TableCell>{item.direccion[0].municipio}</TableCell>
                                <TableCell>{item.direccion[0].zone}</TableCell>
                                <TableCell>{item.direccion[0].indications}</TableCell>
                                <TableCell>{item.direccion[0].state_address}</TableCell>
                                <TableCell>
                                <Link to={`/map/${item.direccion[0].location.coordinates=== undefined ? 1 :item.direccion[0].location.coordinates[1]}/${item.direccion[0].location.coordinates=== undefined ? 1 :item.direccion[0].location.coordinates[0]}`}>
                                  {item.direccion[0].location.coordinates=== undefined ? 1 :item.direccion[0].location.coordinates[1]},
                                  {item.direccion[0].location.coordinates=== undefined ? 1 :item.direccion[0].location.coordinates[0]}
                                </Link>
                                </TableCell>
                                </TableRow>
                            ))
                        }
                    </TableBody>
                </TblContainer>
                <TblPagination/>
                {/*<Map location={location}/>*/}
            </Paper>
            <Popup
                title={title}
                openPopup={openPopup}
                setOpenPopup={setOpenPopup}
            >
            <DeliveryForm 
            recordForEdit={recordForEdit}
            addOrEdit={addOrEdit}
            setTitle={setTitle}
            />
            </Popup>
        </>
    )
}