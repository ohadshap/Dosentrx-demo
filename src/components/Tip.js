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


const Tip = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [name, setName] = useState(props.t.name)

    const dropIt = () => {
        props.drop(props.t, props.i)
    }

    return (
        <div>
            <span>{name}</span>
            <span onClick={dropIt}>   <b>X</b></span>
        </div>
    )
}))
export default Tip