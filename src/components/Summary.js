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

// <form className={classes.root} noValidate autoComplete="off"></form>

const Summary = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();

    return (
        <div className={classes.container}>
            Im summary
            <TextField  className={classes.root} label="Patient's ID" />
            <TextField  className={classes.root} label="Patient's Name" />
            <TextField  className={classes.root} label="Patient's Phone Number" />
            
            <Button className={classes.btn} variant="contained" color="primary">
                Therapy
            </Button>
        
            
        </div>
    )
}))
export default Summary