import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import Symptom from './Symptom'
import Tip from './Tip'


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
        width: '80%',
        '& > *': {
            width: '100%'
        }
    },
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: '100%',
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
        width: '40%'
    },
    btn: {
        minWidth: '15vw',
        fontSize: 'small',
        padding: '5px',
    },
}));


function not(a, b) {
    return a.filter((value) => b.indexOf(value) === -1);
}
  
function intersection(a, b) {
    return a.filter((value) => b.indexOf(value) !== -1);
}
  
function union(a, b) {
    return [...a, ...not(b, a)];
}




const Medication = inject("MainStore", "InputStore")(observer((props) => { 
    const classes = useStyles();

    const [checked, setChecked] = useState([]);
    const [checkedTips, setCheckedTips] = useState([]);
    const [left, setLeft] = useState(props.data.sympt);
    const [right, setRight] = useState([]);
    const [med, setMed] = useState(null);
    const [show, setShow] = useState(false)
    const [showSymp, setShowSymp] = useState(false)
    const [tipList, setTipList] = useState(props.MainStore.allTips)
    const [tip, setTip] = useState([]);

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);
    const tipsChecked = intersection(checked, tipList);

    const inputHandler = (e) => {
        props.InputStore.handleInput(e.target.name, e.target.value)
        if(e.target.name === "med") {
            setMed(e.target.value) 
        } else {
            setTip(e.target.value) 
        }
    }

    const addNewMed = () => {
        console.log(`add med`)
        setShow(true)
    }

    const addDetails = () => {
        console.log(tip)
        props.MainStore.addMed(med) 
        // props.MainStore.addTip(tip)
        setShowSymp(true)
    }

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];
        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }
        setChecked(newChecked);
    };

    const numberOfChecked = (items) => intersection(checked, items).length;

    const handleToggleAll = (items) => () => {
        if (numberOfChecked(items) === items.length) {
            setChecked(not(checked, items));
        } else {
            setChecked(union(checked, items));
        }
    };

    const handleCheckedRight = () => {
        setRight(right.concat(leftChecked));
        setLeft(not(left, leftChecked));
        setChecked(not(checked, leftChecked));
    };

    const handleCheckedTips = () => {
        setTip(tip.concat(tipsChecked))
        setTipList(not(tipList, tipsChecked))
        setChecked(not(checked, tipsChecked));
        props.MainStore.addTip(tipsChecked, med)
        console.log(tipsChecked)
    }

    const handleTips = (datum, i) => {
        setTipList([...tipList, {name: datum.name}]);
        let s = tip.splice(i, 1)
        setTip(tip);

    }

    const handleCheckedLeft = (datum, i) => { 
        setLeft([...left, {name: datum.name, freq: datum.freq}]);
        let s = right.splice(i, 1)
        setRight(right);
    };

    const customList = (title, items) => (
        <Card>
            <CardHeader
                className={classes.cardHeader}
                avatar={
                <Checkbox
                    onClick={handleToggleAll(items)}
                    checked={numberOfChecked(items) === items.length && items.length !== 0}
                    indeterminate={numberOfChecked(items) !== items.length && numberOfChecked(items) !== 0}
                    disabled={items.length === 0}
                    inputProps={{ 'aria-label': 'all items selected' }}
                />
                }
                title={title}
                subheader={`${numberOfChecked(items)}/${items.length} selected`}
            />

            <Divider />

            <List className={classes.list} dense component="div" role="list">
                {items.map((value) => {
                    const labelId = `transfer-list-all-item-${value}-label`;
                    return (
                        <ListItem key={value} role="listitem" button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                checked={checked.indexOf(value) !== -1}
                                tabIndex={-1}
                                disableRipple
                                inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                        
                            <ListItemText id={labelId} primary={value.name} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Card>
  );

    return (
        <div className={classes.container}>
            {/* Im Medication */}

            <Autocomplete
                options={props.data.meds}
                className={classes.autocomp}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onSelect={inputHandler}
                renderInput={(params) => <TextField name="med" {...params} value={med} onChange={inputHandler} label="Medication" variant="outlined" />}
            />

            {
                med ?
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                    <Grid item>{customList('Tips', tipList)}</Grid>
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedTips}
                        disabled={tipsChecked.length === 0}
                        aria-label="move selected right"
                        >
                        add
                    </Button>

                </Grid> : null
            }

            {
                tip.length ?
                tip.map((t,i) => <Tip i={i} drop={handleTips} t={t}/>) :
                null
            }


            {
                tip.length ?
                <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                    <Grid item>{customList('Symptoms', left)}</Grid>
                    
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                        >
                        add
                    </Button>

                </Grid> : 
                null
            }

            {right.length ?
                right.map((s,i) => <Symptom i={i} drop={handleCheckedLeft} sym={s}/>) :
                null
            }

            {right.length && !show && showSymp ?
            <Button onClick={addNewMed} className={classes.btn} variant="contained" color="primary">
                Add Medecation
            </Button> :
            <Button onClick={addDetails} className={classes.btn} variant="contained" color="primary">
                Done!
            </Button>
            }

            {show ?
            <Medication data={props.data}/> :
            null
            }
        </div>
    )
}))
export default Medication