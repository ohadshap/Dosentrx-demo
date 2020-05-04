import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import pic from '../assets/img/background.jpg'

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
        left: '11.5vw',
        position: 'fixed',
        bottom: '13.5vh',
        height: '6vh',
        fontSize: 'small',
    },
}));


const Base = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();

    const addNewPatient = () => {
        props.MainStore.goNext()
    }

    return (
        <div className={classes.container}>
            <img className={classes.root} src={pic} />
            <div className={classes.btn} onClick={addNewPatient}></div>
        </div>
    )
}))
export default Base