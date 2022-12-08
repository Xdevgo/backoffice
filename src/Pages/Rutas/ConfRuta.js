import React from "react";
import ReactDOM from "react-dom";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Input from "@material-ui/core/Input";
import Paper from "@material-ui/core/Paper";
import IconButton from "@material-ui/core/IconButton";
// Icons
import EditIcon from "@material-ui/icons/EditOutlined";
import DoneIcon from "@material-ui/icons/DoneAllTwoTone";
import RevertIcon from "@material-ui/icons/NotInterestedOutlined";


const useStyles = makeStyles(theme => ({
    root: {
      width: "100%",
      marginTop: theme.spacing(3),
      overflowX: "auto"
    },
    table: {
      minWidth: 650
    },
    selectTableCell: {
      width: 60
    },
    tableCell: {
      width: 130,
      height: 20
    },
    input: {
      width: 130,
      height: 40
    },
    tablerow:{
    padding:0
    },
    toolbar: theme.mixins.toolbar,
  }));

  const createData = (name, calories, fat, carbs, protein) => ({
    id: name.replace(" ", "_"),
    name,
    calories,
    fat,
    carbs,
    protein,
    isEditMode: false
  });
  
  const CustomTableCell = ({ row, name, onChange }) => {
    const classes = useStyles();
    const { isEditMode } = row;
    return (
      <TableCell align="left" className={classes.tableCell}>
        {isEditMode ? (
          <Input
            value={row[name]}
            name={name}
            onChange={e => onChange(e, row)}
            className={classes.input}
          />
        ) : (
          row[name]
        )}
      </TableCell>
    );
  };


  function ConfRuta() {
    const [rows, setRows] = React.useState([
      createData("Frozen yoghurt", 159, 6.0, 24, 4.0,1,2,3,4),
      createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
      createData("Eclair", 262, 16.0, 24, 6.0)
    ]);
    const [previous, setPrevious] = React.useState({});
    const classes = useStyles();
  
    const onToggleEditMode = id => {
      setRows(state => {
        return rows.map(row => {
          if (row.id === id) {
            return { ...row, isEditMode: !row.isEditMode };
          }
          return row;
        });
      });
    };
  
    const onChange = (e, row) => {
      if (!previous[row.id]) {
        setPrevious(state => ({ ...state, [row.id]: row }));
      }
      const value = e.target.value;
      const name = e.target.name;
      const { id } = row;
      const newRows = rows.map(row => {
        if (row.id === id) {
          return { ...row, [name]: value };
        }
        return row;
      });
      setRows(newRows);
    };
  
    const onRevert = id => {
      const newRows = rows.map(row => {
        if (row.id === id) {
          return previous[id] ? previous[id] : row;
        }
        return row;
      });
      setRows(newRows);
      setPrevious(state => {
        delete state[id];
        return state;
      });
      onToggleEditMode(id);
    };
  
    return (
        <>
        <div className={classes.toolbar}></div>   
      <Paper className={classes.root}>
        <Table className={classes.table} aria-label="caption table">
          <TableHead>
            <TableRow >
              <TableCell align="left" />
              <TableCell align="left">Fecha</TableCell>
              <TableCell align="left">Orden</TableCell>
              <TableCell align="left">Guia</TableCell>
              <TableCell align="left">Acción</TableCell>
              <TableCell align="left">Proxima Guia</TableCell>
              <TableCell align="left">Dirección</TableCell>
              <TableCell align="left">Distancia</TableCell>
              <TableCell align="left">Duración</TableCell>
              <TableCell align="left">Locación</TableCell>
              <TableCell align="left">Estado</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableCell className={classes.selectTableCell}>
                  {row.isEditMode ? (
                    <>
                      <IconButton
                        aria-label="done"
                        onClick={() => onToggleEditMode(row.id)}
                      >
                        <DoneIcon />
                      </IconButton>
                      <IconButton
                        aria-label="revert"
                        onClick={() => onRevert(row.id)}
                      >
                        <RevertIcon />
                      </IconButton>
                    </>
                  ) : (
                    <IconButton
                      aria-label="delete"
                      onClick={() => onToggleEditMode(row.id)}
                    >
                      <EditIcon />
                    </IconButton>
                  )}
                </TableCell>
                <CustomTableCell {...{ row, name: "name", onChange }} />
                <CustomTableCell {...{ row, name: "calories", onChange }} />
                <CustomTableCell {...{ row, name: "fat", onChange }} />
                <CustomTableCell {...{ row, name: "carbs", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
                <CustomTableCell {...{ row, name: "protein", onChange }} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      </>
    );
  }


  export default ConfRuta;