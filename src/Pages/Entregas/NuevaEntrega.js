import React,{useState, useEffect} from 'react'
import EntregaForm from "../../components/Entregas/EntregaForm";
import UpdateCustomer from "../../components/Entregas/UpdateCustomer";
import useTable from '../../components/Entregas/useTable';

import axios from 'axios';
import Controls from '../../components/shared/controls/Controls';
import { Search, Timer } from "@material-ui/icons";
import AddIcon from '@material-ui/icons/Add';
import SystemUpdateAltOutlinedIcon from '@material-ui/icons/SystemUpdateAltOutlined';
import MyLocationOutlinedIcon from '@material-ui/icons/MyLocationOutlined';
import PeopleAltOutlinedIcon from '@material-ui/icons/PeopleAltOutlined';
import { Alert, AlertTitle } from '@material-ui/lab';
import Popup from "../../components/Popup";
import {  Link } from 'react-router-dom';


import { Paper, makeStyles, TableBody, TableRow, TableCell, Toolbar, InputAdornment, Tooltip, Dialog  } from '@material-ui/core';
import SelectInput from '@material-ui/core/Select/SelectInput';
//const getClientes = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/clients" 
const getClientes = "http://localhost:3001/api/clients/v2"

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
    {id: 'actions', label:'Ingresar', disableSorting: true},
    {id: 'id', label: 'Codigo Cliente'},
    {id: 'name', label: 'Nombre/Tienda'},
    {id: 'phone', label: 'Telefono'},
    {id: 'address', label: 'Dirección'},
    {id: 'depto', label: 'Departamento'},
    {id: 'municipio', label: 'Municipio'},
    {id: 'zone', label: 'Zona'},
    {id: 'indications', label: 'Indicaciones'},
    {id: 'bank', label: 'Banco'},
    {id: 'typeacount', label: 'Tipo'},
    {id: 'nameacount', label: 'Cuenta'},
    {id: 'level', label: 'Nivel'},
    {id: 'location', label: 'Ubicación'},
    {id: 'actions', label:'Actualizar', disableSorting: true},
]

export default function NuevaEntrega() {

    const classes = useStyles();
    const [recordForEdit, setRecordForEdit] = useState(null)
    const [recordForUpdate, setRecordForUpdate] = useState(null)
    const [deliveryid, setDeliverid]= useState(null);
    const [title, setTitle] = useState(null)
    const [records, setRecords] = useState([]);
    const [filterFn, setFilterFn] = useState({ fn: items => { return items; } })
    const [openPopup, setOpenPopup] = useState(false)
    const [openPopup2, setOpenPopup2] = useState(false)
    const [openPopup3, setOpenPopup3] = useState(false)
    const [openPopup4, setOpenPopup4] = useState(false)
    const [statusAlert, setStatusAlert] = useState("Info")
    const [msjAlert, setMsjAlert] = useState("")
    const [msjAlert2, setMsjAlert2] = useState("")


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
            "phone_origin" : entrega.mobileClient,
            "address_origin": {
               "primary" : entrega.addressOrigin,
               "depto": entrega.deptoOrigin,
               "municipio": entrega.muniOrigin,
               "zone": entrega.zoneOrigin,
               "indications": entrega.indicationsOrigin,
               "location": {
                   "lat": entrega.coordenadasLat !== undefined ? entrega.coordenadasLat: 0,
                   "lng": entrega.coordenadasLng !== undefined ? entrega.coordenadasLng: 0,
               },
               "state_origin_address": "I",
			   "uri": entrega.uriLocationOrigin
            },
            "name_target": entrega.targetName,
            "phone_target" : entrega.mobileTarget,
            "address_target":{
                "primary" : entrega.addressTarget,
               "depto": entrega.deptoTarget,
               "municipio": entrega.muniTarget,
               "zone": entrega.zoneTarget,
               "indications": entrega.indicationsTarget,
               "location": {
                   "lat": entrega.coordenadasTargetLat !== undefined ? entrega.coordenadasTargetLat: 0,
                   "lng": entrega.coordenadasTargetLng !== undefined ? entrega.coordenadasTargetLng: 0,
               },
               "state_target_address": "I",
			   "uri" :entrega.uriLocationTarget
            },
            "bank":entrega.bank !== undefined ? entrega.bank: 'NA',
            "typeacount":entrega.typeacount !== undefined ? entrega.typeacount: 'NA',
            "noacount":entrega.noacount !== undefined ? entrega.noacount: 0,
            "nameacount":entrega.nameacount !== undefined ? entrega.nameacount: 'NA',
            "description_product":entrega.product !== undefined ? entrega.product: 'Paquete',
            "quantity": entrega.quantity !== undefined ? entrega.quantity: 1,
            "amount": entrega.amount,
            "weight": entrega.weight  !== undefined ? entrega.weight: 5,
            "dimensions": entrega.dimensions  !== undefined ? entrega.dimensions: 20,
            "state_delivery": "I",
			"createdDate": entrega.createDate !== undefined ? entrega.createDate: new Date(),
			"schedulingDate": entrega.schedulingDate !== undefined ? entrega.schedulingDate: new Date().toLocaleDateString('en-GT'),
			"schedulingTime": entrega.schedulingTime !== undefined ? entrega.schedulingTime: '08:00',
			"horaindicaciones":  entrega.horaindicaciones !== undefined ? entrega.horaindicaciones: 'D',
        };

        
            //const GeneraEntrega = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries/v2" 
            const GeneraEntrega = "http://localhost:3001/api/deliveries/v2"
            const headers = {
              'Content-Type': 'application/json'
            }
        
         try{
             console.log('"""""""""""""""')
             console.log(data)
            const resp = await axios ({
              url: GeneraEntrega,
              headers: headers,
              method: 'POST',
              data: data,
            })
            setDeliverid(resp.data.Delivery.deliveryID)
            if(resp.data.Delivery.deliveryID > 0){
                setOpenPopup4(true)
                setStatusAlert("Success")
                setMsjAlert2("existosa! " + resp.data.Delivery.area + resp.data.Delivery.deliveryID )
                //setTimeout(function(){ }, 2000);
                //setOpenPopup3(false)
                 //alert("Usuario Actualizado existosamente")
                 }else{
                  setOpenPopup4(true)
                  setStatusAlert("Error")
                  setMsjAlert2("fallida... Intente nuevamente")
                 }

            peticionGet();
            }catch(e){
              console.log(e);         
        
          };
          
        }

    const handleUpdate = async(entrega) => {
   console.log("handleUpdate")
   console.log(entrega)
   const dataUpdate = {
    "creator": entrega.creator,
    "name" : entrega.originName !== undefined ? entrega.originName: "SIN NOMBRE",
    "phone" : entrega.mobileClient !== undefined ? entrega.mobileClient: -1,
    "address": {
       "primary" : entrega.addressOrigin !== undefined ? entrega.addressOrigin: "SIN DIRECCION",
       "depto": entrega.deptoOrigin !== undefined ? entrega.deptoOrigin: "SIN DEPTO",
       "municipio": entrega.muniOrigin !== undefined ? entrega.muniOrigin: "SIN MUNICIPIO",
       "zone": entrega.zoneOrigin !== undefined ? entrega.zoneOrigin: -1,
       "indications": entrega.indicationsOrigin !== undefined ? entrega.indicationsOrigin: "NA",
       "location": {
           "lat": entrega.coordenadasLat !== undefined ? entrega.coordenadasLat: 0,
           "lng": entrega.coordenadasLng !== undefined ? entrega.coordenadasLng: 0,
       },
       "state_origin_address": "I",
       "uri": entrega.uriLocationOrigin !== undefined ? entrega.uriLocationOrigin: "",
    },
    "bank":entrega.bank !== undefined ? entrega.bank: 'NA',
    "typeacount":entrega.typeacount !== undefined ? entrega.typeacount: 'NA',
    "noacount":entrega.noacount !== undefined ? entrega.noacount: 0,
    "nameacount":entrega.nameacount !== undefined ? entrega.nameacount: 'NA',
   
};


    //const GeneraEntrega = "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries/v2" 
    const actualizaCustomer = "http://localhost:3001/api/deliveries/updateCustomer"
    const headers = {
      'Content-Type': 'application/json'
    }

    try{
        console.log('------------------------------')
        console.log(dataUpdate)
       const resp = await axios ({
         url: actualizaCustomer,
         headers: headers,
         method: 'PATCH',
         data: dataUpdate,
       })
       if(resp.data.message.modifiedCount > 0){
      setOpenPopup3(true)
      setStatusAlert("Success")
      setMsjAlert("existosa!")
      //setTimeout(function(){ }, 2000);
      //setOpenPopup3(false)
       //alert("Usuario Actualizado existosamente")
       }else{
        setOpenPopup3(true)
        setStatusAlert("Error")
        setMsjAlert("fallida...")
       }
       peticionGet();
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
                if (target.value === "")
                    return items;
                else
                    return items.filter(({name, phone}) => name.toLowerCase().includes(target.value.toLowerCase()) || phone.toString().includes(target.value))

                    
            }
        })
    }


    const addOrEdit = (cliente, resetForm) => {
        console.log("addOrEdit")

        if (cliente.creator === "0")            
             handleEntrega(cliente)
        else
            handleEntrega(cliente)
        resetForm()
        setRecordForEdit(null)
        setRecordForUpdate(null)
        setOpenPopup(false)
        setOpenPopup2(false)
        //alert(" El numero de entrega es "+ Promise(resolve => deliveryid));
        peticionGet();
    }

    const addOrEdit2 = (cliente, resetForm) => {
        console.log("addOrEdit2")
        handleUpdate(cliente)
        resetForm()
        setRecordForEdit(null)
        setRecordForUpdate(null)
        setOpenPopup(false)
        setOpenPopup2(false)
        //alert(" El numero de entrega es "+ Promise(resolve => deliveryid));
        peticionGet();
    }

    const openInPopup = item => {
  console.log(item)
    const cliente = {
            creator : item._id,
            originName: item.name,
            mobileClient: item.phone,
            addressOrigin: item.address,
            deptoOrigin: item.depto,
            muniOrigin: item.municipio,
            zoneOrigin: item.zone,
            indicationsOrigin: item.indications,
            bank:item.bank,
            typeacount:item.typeacount,
            noacount:item.noacount,
            nameacount:item.nameacount,
            coordenadasLat1: item.location.coordinates[1], 
            coordenadasLng1: item.location.coordinates[0]
        }
        setRecordForEdit(cliente)
        setRecordForUpdate(null)
        setOpenPopup(true)
    }

    const openInPopupUpdate = item => {
        console.log("openInPopupUpdate")
        const cliente = {
            creator : item._id,
            originName: item.name,
            mobileClient: item.phone,
            addressOrigin: item.address,
            deptoOrigin: item.depto,
            muniOrigin: item.municipio,
            zoneOrigin: item.zone,
            indicationsOrigin: item.indications,
            bank:item.bank,
            typeacount:item.typeacount,
            noacount:item.noacount,
            nameacount:item.nameacount,
            coordenadasLat1: item.location.coordinates[1], 
            coordenadasLng1: item.location.coordinates[0]
        }
        setRecordForUpdate(cliente)
        setRecordForEdit(null)
        setOpenPopup2(true)
    }

    const handleClose = () => {
        setOpenPopup3(false);
      };
      const handleClose2 = () => {
        setOpenPopup4(false);
      };

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
                        onClick={() => { setTitle('Cliente Nuevo'); setOpenPopup(true); setRecordForEdit(null); }}
                    />
                    </Tooltip>

                </Toolbar>
                <TblContainer>
                    <TblHead/>
                    <TableBody>
                        {
                           recordsAfterPagingAndSorting().map(item => 
                            (
                                <TableRow key={item._id}>
                                <TableCell>
                                        <Controls.ActionButton
                                            color="blue"
                                            onClick={() => { openInPopup(item) }}>
                                            <AddIcon fontSize="small" />
                                        </Controls.ActionButton>
                                </TableCell>
                                <TableCell>
                                <Link to={{ pathname: `https://xgob2b.web.app/client/${item._id}` }} target="_blank">
                                {item._id}
                                </Link></TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.phone}</TableCell>
                                <TableCell  style={{ width: 300 }} align="left" colSpan={4}>{item.address} , {item.zone} {item.municipio} </TableCell>
                                <TableCell>{item.indications}</TableCell>
                                <TableCell>{item.bank}</TableCell>
                                <TableCell>{item.typeacount}</TableCell>
                                <TableCell>{item.nameacount}</TableCell>
                                <TableCell>{item.level}</TableCell>
                                <TableCell>
                                <Link to={`/map/${item.location.coordinates=== undefined ? 1 :item.location.coordinates[1]}/${item.location.coordinates=== undefined ? 1 :item.location.coordinates[0]}`}>
                                <MyLocationOutlinedIcon fontSize="small" />
                                </Link>
                                </TableCell>
                                <TableCell>
                                        <Controls.ActionButton
                                            color="blue"
                                            onClick={() => { openInPopupUpdate(item) }}>
                                            <PeopleAltOutlinedIcon fontSize="small" />
                                        </Controls.ActionButton>
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
            <EntregaForm 
            recordForEdit={recordForEdit}
            recordForUpdate={recordForUpdate}
            addOrEdit={addOrEdit}
            setTitle={setTitle}
            />
            </Popup>
            <Popup
                title={title}
                openPopup={openPopup2}
                setOpenPopup={setOpenPopup2}
            >
            <UpdateCustomer 
            recordForEdit={recordForEdit}
            recordForUpdate={recordForUpdate}
            addOrEdit={addOrEdit2}
            setTitle={setTitle}
            />
            </Popup>
        <Dialog
        open={openPopup3}
        onClose={handleClose}
        aria-labelledby="draggable-dialog-title"
      >
        <Alert severity={statusAlert}>
         <AlertTitle>{statusAlert}</AlertTitle>
         Usuario actualizado de forma {msjAlert}
        </Alert>
      </Dialog>
      <Dialog
        open={openPopup4}
        onClose={handleClose2}
        aria-labelledby="draggable-dialog-title"
      >
        <Alert severity={statusAlert}>
         <AlertTitle>{statusAlert}</AlertTitle>
         Guia creada de forma <strong>{msjAlert2}</strong>
        </Alert>
      </Dialog>
        </>
    )
}