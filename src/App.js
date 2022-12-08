import React  , {Suspense} from 'react';
import { BrowserRouter as Router, Switch , Route} from 'react-router-dom';
import theme from './TemaConfig';
import {
ThemeProvider
} from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import './App.css';
import Home from './Pages/Home';


const Contenedor = React.lazy(() => import('./components/Contenedor'));
const Delivery = React.lazy(() => import('./Pages/Delivery'));
const Plan = React.lazy(() => import('./Pages/Plan'));
const Map = React.lazy(() => import('./components/Clients/Map'));
const Deliveries = React.lazy(() => import('./Pages/Deliveries'));
const DeliveryDetails = React.lazy(() => import('./Pages/DeliveryDetails'));

const ConfiguracionRuta = React.lazy(() => import('./Pages/Rutas/ConfRuta'));
const ParametrizacionRuta = React.lazy(() => import('./Pages/Rutas/Parametrizacion'));

const Tracking = React.lazy(() => import('./Pages/Mensajeros/Tracking'));
const NuevaEntrega = React.lazy(() => import('./Pages/Entregas/NuevaEntrega'));
const NuevaEntregas = React.lazy(() => import('./Pages/Entregas/NuevaEntregas'));
const PlanAll = React.lazy(() => import('./Pages/Planification/PlanAll'));
const PlanAllv2 = React.lazy(() => import('./Pages/Planification/PlanAllv2'));
const Plans = React.lazy(() => import('./Pages/Planification/Plans'));
const Kaban = React.lazy(() => import('./Pages/Planification/Kaban'));
const Plandnd = React.lazy(() => import('./Pages/dnd/Plandnd'));


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(40),
    },
  },
}));

function App() {
  const classes = useStyles();


return (
  <ThemeProvider theme={theme}>       
    <Router>
         <Suspense fallback={
           <div className={classes.root}>
           <LinearProgress color="secondary" />
           <LinearProgress color="primary" />
         </div>
         }>
       <Switch>
       <Route path='/' exact component={Home}/>
       <Route path="/plan"><Plan/></Route>
       <Route path="/delivery"><Delivery/></Route>
       <Route path="/map/:lat/:lng"><Map/></Route>
       <Route path ='/deliveries'><Deliveries/></Route>
       <Route path ='/deliverydetails'><DeliveryDetails/></Route>
       <Route path='/Kaban'><Kaban/></Route>
       <Route path='/paramsRuta'><ParametrizacionRuta/></Route>
       <Route path='/tracking'><Tracking/></Route>
       <Route path='/nuevaentrega'><NuevaEntrega/></Route>
       <Route path='/nuevaentregas'><NuevaEntregas/></Route>
       <Route path='/plans'><Plans/></Route>
       <Route path='/PlanAll'><PlanAll/></Route>
       <Route path='/plandnd'><Plandnd/></Route>
       <Route path='/PlanAllv2'><PlanAllv2/></Route>
       </Switch>
       <Contenedor/>
       </Suspense>
     </Router>
     </ThemeProvider>
);

}

export default App;