import React, {useState,useEffect} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import { Grid, TextField, Paper, FormControl, FormLabel, FormControlLabel, Radio, Typography} from '@material-ui/core';
import {useForm, Form} from '../components/shared/useForm';
import Controls  from '../components/shared/controls/Controls';

import * as DeliveryService from '../services/DeliveryService';
const useStyles = makeStyles((theme) => ({
    pageContent: {
        margin: theme.spacing(5),
        padding: theme.spacing(3)
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing(0),
      },
      letra: {
        padding: '8px',
        paddingBottom: '10px',
        color: theme.palette.primary.main
      }
  }));



  const initialFValues = {
    creator: "0",
    id: 0,
    originName: '',
    addressOrigin: '',
    mobile: 0,
    departmentId: '',
    muniId: '',
    zoneId: 0,
    indications:  '',
    hireDate: new Date(),
    isPermanent: false,
    targetName: '',
    mobileTarget: 0,
    addressTarget: '',
    departmentIdTarget: '',
    muniTarget: '',
    zoneIdTarget: 0,
    indicationsTarget: '',
    amount: '',
    weight: '',
    dimensions:'',
    quantity: '',
    product: ''
}

function DeliveryForm(props) {
    const styles = useStyles();
    const { addOrEdit, recordForEdit , setTitle} = props
    const [Disabled, setDisabled] = useState(false)
    console.log(addOrEdit)
    console.log(recordForEdit)
    console.log(setTitle)


 
    const validate = (fieldValues = values) => {
        let temp = { ...errors }
        if ('originName' in fieldValues)
            temp.originName = fieldValues.originName ? "" : "Se requiere el nombre de la persona que envia."
        if ('addressOrigin' in fieldValues)
           // temp.addressOrigin = (/$^|.+@.+..+/).test(fieldValues.addressOrigin) ? "" : "Se requiere la dirección de recoleción."
           temp.addressOrigin = fieldValues.addressOrigin ? "" : "Se requiere la dirección de recoleción."
        if ('mobile' in fieldValues)
            temp.mobile = fieldValues.mobile.toString().length > 7 ? "" : "Debe ingresar un numero de 8 caracteres."
        if ('departmentId' in fieldValues)
            temp.departmentId = fieldValues.departmentId.length != 0 ? "" : "This field is required."
        setErrors({
            ...temp
        })

        if (fieldValues == values)
            return Object.values(temp).every(x => x == "")
    }

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange,
        resetForm
    } = useForm(initialFValues, true, validate);

   /* const handleSubmit = e => {
        e.preventDefault()
        if (validate()){
            DeliveryService.insertEmployee(values)
            resetForm()
        }
    }*/

    const handleSubmit = e => {
        console.log(values)
        e.preventDefault()
        if (validate()) {
            addOrEdit(values, resetForm);
        }
    }

    useEffect(() => {
        console.log("USEEFFECT")
        if (recordForEdit != null){
            setValues({
                ...recordForEdit
            })
        setDisabled(true);
        setTitle("Ingresar entrega con cliente existente")
        }
    }, [recordForEdit])


    return (
        <div className={styles.content}>  
          
        <Form onSubmit={handleSubmit}>
        <Typography className={styles.letra} variant="h9" gutterBottom> {values.creator!='0'? 'No. Cliente: '+values.creator:""}</Typography>     
            <Grid container>
                <Grid item xs={12} sm={4}>
                <Controls.Input
                        label="Telefono Origen"
                        name="mobile"
                        value={values.mobile!=0?values.mobile:''}
                        onChange={handleInputChange}
                        error={errors.mobile}
                        disabled={Disabled}
                    />

                </Grid>
                 <Grid item xs={12} sm={7}>
                    <Controls.Input
                        name="originName"
                        label="Nombre Origen"
                        value={values.originName}
                        onChange={handleInputChange}
                        error={errors.originName}
                        disabled={Disabled}
                    />
                    </Grid>
                 <Grid item xs={12} sm={12}>
                    <Controls.Input
                        label="Dirección de Recolección"
                        name="addressOrigin"
                        value={values.addressOrigin}
                        onChange={handleInputChange}
                        error={errors.addressOrigin}
                        disabled={Disabled}
                    />
                     </Grid>
                 <Grid item xs={12} sm={4}>
                    <Controls.Select
                        name="departmentId"
                        label="Departamento"
                        value={values.departmentId}
                        onChange={handleInputChange}
                        options={DeliveryService.getDepartmentCollection()}
                        error={errors.departmentId}
                        disabled={Disabled}
                    />
                      </Grid>
                 <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="muniId"
                        label="Municipio"
                        value={values.muniId}
                        onChange={handleInputChange}
                        options={DeliveryService.getMuniCollection()}
                        error={errors.muniId}
                        disabled={Disabled}
                    />
                      </Grid>
                 <Grid item xs={12} sm={2}>
                      <Controls.Select
                        name="zoneId"
                        label="Zona"
                        value={values.zoneId}
                        onChange={handleInputChange}
                        options={DeliveryService.getZoneCollection()}
                        error={errors.zoneId}
                        disabled={Disabled}
                    />
                     </Grid>
                 <Grid item xs={12} sm={12}>
                      <Controls.Input
                        label="Indicaciones"
                        name="indications"
                        value={values.indications}
                        onChange={handleInputChange}
                        error={errors.indications}
                        disabled={Disabled}
                    />
                   

                </Grid>
                <Grid item xs={12} sm={12}>
                <Controls.Input
                        label="Descripción Producto"
                        name="product"
                        value={values.product}
                        onChange={handleInputChange}
                        error={errors.product}
                    />   
                     </Grid>
                <Grid item xs={12} sm={2}>
                       <Controls.Input
                        label="Cantidad"
                        name="quantity"
                        value={values.quantity}
                        onChange={handleInputChange}
                        error={errors.quantity}
                    />  
                     </Grid>
                <Grid item xs={12} sm={2}>
                      
                       <Controls.Input
                        label="Total"
                        name="amount"
                        value={values.amount}
                        onChange={handleInputChange}
                        error={errors.amount}
                    /> 
                     </Grid>
                <Grid item xs={12} sm={2}>  
                       <Controls.Select
                        name="weight"
                        label="Peso"
                        value={values.weight}
                        onChange={handleInputChange}
                        options={DeliveryService.getWeigthCollection()}
                        error={errors.weight}
                    />
                     </Grid>
                <Grid item xs={12} sm={4}>
                       <Controls.Select
                        name="dimensions"
                        label="Dimensiones del paquete"
                        value={values.dimensions}
                        onChange={handleInputChange}
                        options={DeliveryService.getDimensionCollection()}
                        error={errors.dimensions}
                    />

                    </Grid>
                <Grid item xs={12} sm={4}>
                <Controls.Input
                        label="Telefono Destino"
                        name="mobileTarget"
                        value={values.mobileTarget!=0?values.mobileTarget:''}
                        onChange={handleInputChange}
                        error={errors.mobileTarget}
                    />
                     </Grid>
                <Grid item xs={12} sm={7}>
                    <Controls.Input
                        name="targetName"
                        label="Nombre Destino"
                        value={values.targetName}
                        onChange={handleInputChange}
                        error={errors.targetName}
                    />
                     </Grid>
                <Grid item xs={12} sm={12}>
                    <Controls.Input
                        label="Dirección de Entrega"
                        name="addressTarget"
                        value={values.addressTarget}
                        onChange={handleInputChange}
                        error={errors.addressTarget}
                    />
                     </Grid>
                <Grid item xs={12} sm={4}>
                    <Controls.Select
                        name="departmentIdTarget"
                        label="Departamento"
                        value={values.departmentIdTarget}
                        onChange={handleInputChange}
                        options={DeliveryService.getDepartmentCollection()}
                        error={errors.departmentIdTarget}
                    />
                     </Grid>
                <Grid item xs={12} sm={4}>
                      <Controls.Select
                        name="muniTarget"
                        label="Municipio"
                        value={values.muniTarget}
                        onChange={handleInputChange}
                        options={DeliveryService.getMuniCollection()}
                        error={errors.muniTarget}
                    />
                     </Grid>
                <Grid item xs={12} sm={2}>
                      <Controls.Select
                        name="zoneIdTarget"
                        label="Zona"
                        value={values.zoneIdTarget}
                        onChange={handleInputChange}
                        options={DeliveryService.getZoneCollection()}
                        error={errors.zoneIdTarget}
                    />
                     </Grid>
                <Grid item xs={12} sm={12}>
                      <Controls.Input
                        label="Indicaciones"
                        name="indicationsTarget"
                        value={values.indicationsTarget}
                        onChange={handleInputChange}
                        error={errors.indicationsTarget}
                    />                  
    <div>
                        <Controls.Button
                            type="submit"
                            text="Submit" />
                        <Controls.Button
                            text="Reset"
                            color="default"
                            onClick={resetForm} />
                    </div>
                </Grid>
            </Grid>
        </Form>       
     </div>

    )
}

export default DeliveryForm
