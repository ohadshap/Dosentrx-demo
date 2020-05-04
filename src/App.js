import React, { useState } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

import PatientPopup from './components/PatientPopup';
import NewTreat from './components/NewTreat'
import Summary from './components/Summary';
import pic from './assets/img/background.png'


const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    },

    root: {
        display: 'block',
        width: '100vw',
        height: '100vh',
        textAlign: 'center',
        paddingBottom: '0px',
        '& > *': {
            position: 'inherit',
        }
    },
    btn: {
        width: '9vw',
        left: '12vw',
        position: 'fixed',
        bottom: '15.5vh',
        height: '6vh',
        fontSize: 'small',
    },
}));



const App = inject("MainStore", "InputStore")(observer((props) => { 

    const classes = useStyles();
    const [open, setOpen] = useState(false);
    
    const handleClose = () => {
      setOpen(false)
    };
  
    const addNewPatient = () => {
      console.log(`new patient`)
      setOpen(true);
      props.MainStore.goNext()
    }

    return (
      <div className={classes.container}>
        
        <img className={classes.root} src={pic} />
        <div className={classes.btn} onClick={addNewPatient}></div>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          {/* <DialogContent> */}
            {
              props.MainStore.stage === 0 ? null :
              props.MainStore.stage === 1 ? <PatientPopup close={handleClose}/> :
              props.MainStore.stage === 2 ? <NewTreat close={handleClose}/> :
              <Summary close={handleClose}/>
            }
          {/* </DialogContent>   */}
          {/* <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Subscribe
          </Button>
        </DialogActions> */}
        </Dialog>
      </div>
    );
  
}))

export default App;
//<PatientPopup /> <NewTreat /> <Summary />