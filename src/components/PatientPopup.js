import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
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
        paddingBottom: '0px',
        '& > *': {
            textAlign: 'center',
            position: 'inherit',
        }
    },

    btn: {
        minWidth: '15vw',
        fontSize: 'small',
        padding: '5px',
    },
}));

// <form className={classes.root} noValidate autoComplete="off"></form>

const PatientPopup = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [name, setName] = useState(props.InputStore.name)
    const [num, setNum] = useState(props.InputStore.num)
    const [pId, setPid] = useState(props.InputStore.pId)

    const inputHandler = (e) => {
        const inp = props.InputStore
        e.target.name === 'name' ?
        inp.handleInput(e.target.name, e.target.value) &&
        setName(e.target.value) :
        e.target.name === 'pId' ? 
        inp.handleInput(e.target.name, e.target.value) &&
        setPid(e.target.value) :
        inp.handleInput(e.target.name, e.target.value) &&
        setNum(e.target.value)
    }

    const setNewPat = () => {
        props.MainStore.setPatient(props.InputStore.pId, props.InputStore.name, props.InputStore.num)
        props.MainStore.goNext()
    }

    return (
        <div className={classes.container}>
            {/* Im Patient Popup */}
            <TextField name="pId" type="number" inputProps={{min: 0, style: { textAlign: 'center' }}}
                value={pId} onChange={inputHandler}  className={classes.root} 
                label="Patient's ID" />

            <TextField name="name" type="text" inputProps={{min: 0, style: { textAlign: 'center' }}}
                value={name} onChange={inputHandler}  className={classes.root} 
                label="Patient's Name" />

            <TextField name="num" type="text" inputProps={{min: 0, style: { textAlign: 'center' }}}
                value={num} onChange={inputHandler}  className={classes.root} 
                label="Patient's Phone Number" />
            
            <Button onClick={setNewPat} className={classes.btn} variant="contained" color="primary">
                Therapy
            </Button>

            <Button className={classes.btn} variant="contained">Cancel</Button>
            
            <Button className={classes.btn} variant="contained" color="primary">
                Create Setup
            </Button>
        
            
        </div>
    )
}))
export default PatientPopup