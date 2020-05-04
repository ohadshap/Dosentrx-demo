import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    container: {
        justifyContent: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    },

    root: {
        display: 'block',
        textAlign: 'center',
        paddingBottom: '0px',
        '& > *': {
            position: 'inherit',
        }
    },

    btn: {
        minWidth: '15vw',
        fontSize: 'small',
        padding: '5px',
    },
}));


const Summary = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [open, setOpen] = useState(true);

    const confirm = () => {
        props.MainStore.goHome()
        props.InputStore.name = null
        props.InputStore.num = null
        props.InputStore.pId = null
        props.InputStore.disease = null
        props.InputStore.diseaseKind = null
        props.InputStore.med = null
        props.InputStore.tip = null
        setOpen(false);
        props.close()
    }

    return (
        <DialogContent>
        <div className={classes.container}>
            <b>Summary:</b>
            {/* <TextField  className={classes.root} label="Patient's ID" />
            <TextField  className={classes.root} label="Patient's Name" />
            <TextField  className={classes.root} label="Patient's Phone Number" /> */}
            <div className={classes.root}>
                <p>Patient Id: {props.MainStore.PatientId}</p>
                <p>Patient's Name: {props.MainStore.PatientName}</p>
                <p>Patient Phone Number: {props.MainStore.PatientPhone}</p>
                <p>Medications: {props.MainStore.Meds.map((m,i) => {return <p>{`${m}: Tip: ${props.MainStore.Tips[i]}`}</p>})}</p>
            </div>
            <Button onClick={confirm} className={classes.btn} variant="contained" color="primary">
                Confirm
            </Button>
        
            
        </div>
        </DialogContent>
    )
}))
export default Summary