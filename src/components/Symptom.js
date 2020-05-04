import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
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
    icon: {
        fontSize: 'small'
        
    },
    

}));


const Symptom = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [name, setName] = useState(props.sym.name)
    const [times, setTimes] = useState(props.sym.freq[0])
    const [every, setEvery] = useState(props.sym.freq[1])

    const dropIt = () => {
        props.drop(props.sym, props.i)
    }

    const setFreq = async () => {
        let newTimes = await prompt(`set number of times per unit`)
        setTimes(newTimes)
        let newFreq = await prompt(`set unit (must be W / D / M)`)
        setEvery(newFreq)
    }

    return (
        <div>
            <span>{name}  </span>
            <span>  {times} / {every} </span>
            <EditIcon onClick={setFreq} className={classes.icon}/>
            <span onClick={dropIt}>   <b>X</b></span>
        </div>
    )
}))
export default Symptom