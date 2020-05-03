import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Button from '@material-ui/core/Button';
import Medication from './Medication';
import DiseaseKind from './DiseaseKind'

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'grid',
        justifyItems: 'center',
        textAlign: 'center',
        '& > *': {
            margin: theme.spacing(1),
        }
    },
    autocomp: {
        display: 'inline-block'
    },
    root: {
        margin: 'auto',
    },
    btn: {
        minWidth: '15vw',
        fontSize: 'small',
        padding: '5px',
    },
}));

const NewTreat = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [kinds, setKinds] = useState([])
    const [disease, setDisease] = useState(' ')
    const [show, setShow] = useState(false)
    
    const setNewTreat = () => {
        props.MainStore.goNext()
    }
    const setKind = () => {
        console.log(disease)
        if(!disease) {
            alert(`you must enter a disease`)
        } else {
            let newKinds = props.MainStore.setCurDisease(disease)
            console.log(newKinds)
            setKinds(newKinds)
            setShow(true)
        }
    }
    const inputHandler = (e) => {
        const inp = props.InputStore
        inp.handleInput(e.target.name, e.target.value)
        setDisease(e.target.value)
    }

    return (
        <div className={classes.container}>
            {/* Im New Treat */}
            <Autocomplete
                options={props.MainStore.Diseases}
                className={classes.autocomp}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                onSelect={inputHandler}
                renderInput={(params) => <TextField name="disease"
                onChange={inputHandler} value={disease} {...params} label="Disease Group" variant="outlined" />}
            />

            {show ?
            <DiseaseKind key={`disease-kind-${disease}`} kinds={kinds}/> :
            <Button onClick={setKind} className={classes.btn} variant="contained" color="primary">
                Select Disease
            </Button>
            }

            <Button onClick={setNewTreat} className={classes.btn} variant="contained" color="primary">
                Finish
            </Button>
            
        </div>
    )
}))
export default NewTreat

// <TextField  className={classes.root} label="Patient's ID" />
// <TextField  className={classes.root} label="Patient's Name" />
// <TextField  className={classes.root} label="Patient's Phone Number" />
// 
// <Button className={classes.btn} variant="contained" color="primary">
//     Therapy
// </Button>
// 
// <Button className={classes.btn} variant="contained">Cancel</Button>
// 
// <Button className={classes.btn} variant="contained" color="primary">
//     Create Setup
// </Button>