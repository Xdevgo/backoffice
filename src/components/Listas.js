import React from 'react'
import {
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Divider,
    Collapse,
    makeStyles
    
} from '@material-ui/core';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';

import { SidebarData } from './NavData';

import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }));

const Listas = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(true);

    const handleClick = () => {
        setOpen(!open);
      };

    return (
        <div>
        <List component="nav" aria-label="main mailbox folders">

        {SidebarData.map((item, index) => {
              if(item.enable && !item.Collapse){
              return (
                <div>
                <ListItem button component={Link} to={item.path} onClick={props.onClose ? props.onClose : null}>
                <ListItemIcon>
                {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.title} />
                </ListItem>
                   </div>
              );}
              if(item.enable && item.Collapse){
                return (
                    <div>
                        <Divider/>
                    <ListItem button onClick={handleClick} >
                    <ListItemIcon>
                    {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                    {open ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                         <Collapse in={open} timeout="auto" unmountOnExit>
                         <List component="div" disablePadding>
                           <ListItem button className={classes.nested} component={Link} to={item.path1} onClick={props.onClose ? props.onClose : null}>
                             <ListItemIcon>
                               {item.Icon1}
                             </ListItemIcon>
                             <ListItemText primary={item.subtitle1} />
                           </ListItem>
                           <ListItem button className={classes.nested} component={Link} to={item.path2} onClick={props.onClose ? props.onClose : null}>
                             <ListItemIcon>
                               {item.Icon2}
                             </ListItemIcon>
                             <ListItemText primary={item.subtitle2} />
                           </ListItem>
                           <ListItem button className={classes.nested} component={Link} to={item.path3} onClick={props.onClose ? props.onClose : null}>
                             <ListItemIcon>
                               {item.Icon3}
                             </ListItemIcon>
                             <ListItemText primary={item.subtitle3} />
                           </ListItem>
                         </List>
                       </Collapse>
                       <Divider/>
                      </div>
                  );

              }

              
            })}
            <Divider/>

      </List>
        </div>
    )
}

export default Listas
