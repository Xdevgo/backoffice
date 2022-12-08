import axios from 'axios';


const KEYS ={
    employees:'employees',
    employeeId:'employeeId'
}

export const getDepartmentCollection = ()=>([
    { id: 'Guatemala', title: 'Guatemala' }
])

export const getMuniCollection = ()=>([
    { id: 'Mixco', title: 'Mixco' },
    { id: 'Guatemala', title: 'Guatemala' },
    { id: 'Villa Nueva', title: 'Villa Nueva' },
    { id: 'San Jose Pinula', title: 'San Jose Pinula' },
    { id: 'Santa Catarina Pinula', title: 'Santa Catarina Pinula' },
    { id: 'Fraijanes', title: 'Fraijanes' },
    { id: 'Villa Canales', title: 'Villa Canales' },
    { id: 'San Miguel Petapa', title: 'San Miguel Petapa' },
    { id: 'Chinautla', title: 'Chinautla' },
    { id: 'Palencia', title: 'Palencia' },
    { id: 'San Pedro Sacatepequez', title: 'San Pedro Sacatepequez' },
    { id: 'San Juan Sacatepequez', title: 'San Juan Sacatepequez' },
    { id: 'San Pedro Ayampuc', title: 'San Pedro Ayampuc' },
])

export const getZoneCollection = ()=>([
    { id: '1', title: '1' },
    { id: '2', title: '2' },
    { id: '3', title: '3' },
    { id: '4', title: '4' },
    { id: '5', title: '5' },
    { id: '6', title: '6' },
    { id: '7', title: '7' },
    { id: '8', title: '8' },
    { id: '9', title: '9' },
    { id: '10', title: '10' },
    { id: '11', title: '11' },
    { id: '12', title: '12' },
    { id: '13', title: '13' },
    { id: '14', title: '14' },
    { id: '15', title: '15' },
    { id: '16', title: '16' },
    { id: '17', title: '17' },
    { id: '18', title: '18' },
    { id: '19', title: '19' },
    { id: '20', title: '20' },
    { id: '21', title: '21' },
    { id: '22', title: '22' },
    { id: '23', title: '23' },
    { id: '24', title: '24' },
    { id: '25', title: '25' },
])

export const getDimensionCollection = ()=>([
    { id: '10', title: 'Menor a 10 centimetros cuadrados' },
    { id: '20', title: 'Menor a 20 centimetros cuadrados' },
    { id: '30', title: 'Menor a 30 centimetros cuadrados' },
    { id: '40', title: 'Menor a 50 centimetros cuadrados' }
])

export const getWeigthCollection = ()=>([
    { id: '1', title: 'Menor a 1 Libra' },
    { id: '5', title: 'Menor a 5 Libra' },
    { id: '10', title: 'Menor a 10 Libra' },
    { id: '25', title: 'Menor a 25 Libra' },
    { id: '50', title: 'Menor a 50 Libra' },
])

export const getPeso = ()=>([
    {
      value: 1,
      label: '1 lb',
    },
    {
      value: 5,
      label: '5 lb',
    },
    {
      value: 10,
      label: '10 lb',
    },
    {
      value: 25,
      label: '25 lb',
    },
    {
      value: 30,
      label: '30 lb',
    },
  ]);

  export const getEstadosDelivery = ()=>([
    {
      id: 'I',
      title: 'Ingresado',
    },
    {
      id: 'C',
      title: 'Calendarizado',
    },
    {
      id: 'CR',
      title: 'Camino Recolectar',
    },
    {
      id: 'R',
      title: 'Recolectado',
    },
    {
      id: 'B',
      title: 'Bodega',
    },
    {
      id: 'CE',
      title: 'Camino a Entregar',
    },
    {
      id: 'E',
      title: 'Entregado',
    },
    {
      id: 'ER',
      title: 'En Reserva',
    },
    {
      id: 'D',
      title: 'Depositado',
    },
    {
      id: 'X',
      title: 'Cancelado',
    }
  ]);

     

  export const getDimensiones = ()=>([
    {
      value: 20,
      label: '20 cm³',
    },
    {
      value: 30,
      label: '30 cm³',
    },
    {
      value: 40,
      label: '40 cm³',
    },
    {
      value: 50,
      label: '50 cm³',
    },
  ]);

export const getBanks = ()=>([
    { id: 'BI', title: 'BI' },
    { id: 'BANRURAL', title: 'BANRURAL' },
    { id: 'G&TCONTINENTAL', title: 'G&T CONTINENTAL' },
    { id: 'BAM', title: 'BAM' },
    { id: 'PROMERICA', title: 'BANCO PROMERICA' }
])

export const gettypeAccount = ()=>([
    { id: 'monetaria', title: 'Monetaria' },
    { id: 'ahorro', title: 'Ahorro' }
])

export function insertEmployee(data) {
    console.log(data);
    let employees=getAllEmployees();
    data['id'] = generateEmployeeId()
    employees.push(data)
    localStorage.setItem(KEYS.employees,JSON.stringify(employees))
    
}

export function generateEmployeeId() {
    if (localStorage.getItem(KEYS.employeeId) == null)
        localStorage.setItem(KEYS.employeeId, '0')
    var id = parseInt(localStorage.getItem(KEYS.employeeId))
    localStorage.setItem(KEYS.employeeId, (++id).toString())
    return id;
}

export function getAllEmployees() {
    if (localStorage.getItem(KEYS.employees) == null)
        localStorage.setItem(KEYS.employees, JSON.stringify([]))
    return JSON.parse(localStorage.getItem(KEYS.employees));
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
    "state_delivery": "I"
};


    const GeneraEntrega =  "https://us-central1-xgogt502.cloudfunctions.net/xgoapidelivery/api/deliveries/v2" 

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
    alert("Tracking ID "+resp.data.Delivery.deliveryID)
    return resp.data.Delivery.deliveryID

    }catch(e){
      console.log(e);
  

  };
}


export  const getAllClientes = async() => {
 
    const getClientes =  "http://localhost:3001/api/clients" 

    let clientes

 try{
    const resp = await axios ({
      url: getClientes,
      method: 'GET'
    })
    clientes = resp;

    }catch(e){
      console.log(e);
  

  };
    return JSON.parse(clientes);
}
