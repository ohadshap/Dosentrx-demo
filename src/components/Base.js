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


const Base = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();


    return (
        <div className={classes.container}>
            <img src="/Users/Ohad/Desktop/code/Dosentrx-demo/dosentrx/src/assets/img/background.jpg" />
            {/* <div className={classes.root}>
            
            </div> */}
            
        
            
        </div>
    )
}))
export default Base