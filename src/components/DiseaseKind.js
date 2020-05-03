import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Medication from './Medication';

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


const Kind = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();
    const [diseaseKind, setDiseaseKind] = useState(' ')
    const [diseaseData, setDiseaseData] = useState(' ')
    const [show, setShow] = useState(false)


    const inputHandler = (e) => {
        const inp = props.InputStore
        inp.handleInput(e.target.name, e.target.value)
        setDiseaseKind(e.target.value)
        props.MainStore.setCurKind(e.target.value)
    }

    const setKind = () => {
        console.log(diseaseKind)
        if(!diseaseKind) {
            alert(`you must enter a disease`)
        } else {
            let newKind = props.MainStore.setCurKind(diseaseKind)
            console.log(newKind)
            setDiseaseData(newKind)
            setShow(true)
        }
    }


    return (
        <div className={classes.container}>
            {/* Im Kind */}

            <Autocomplete
                options={props.kinds}
                className={classes.autocomp}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onSelect={inputHandler}
                renderInput={(params) => <TextField name="diseaseKind"
                onChange={inputHandler} value={diseaseKind} {...params} label="Disease" variant="outlined" />}
            />

            {show ?
            <Medication key={diseaseData.name} data={diseaseData}/> :
            <Button onClick={setKind} className={classes.btn} variant="contained" color="primary">
                Select Kind
            </Button>
            }
            
            
        
            
        </div>
    )
}))
export default Kind