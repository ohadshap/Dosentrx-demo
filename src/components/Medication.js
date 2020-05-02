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
    cardHeader: {
        padding: theme.spacing(1, 2),
    },
    list: {
        width: 200,
        height: 230,
        backgroundColor: theme.palette.background.paper,
        overflow: 'auto',
    },
    button: {
        margin: theme.spacing(0.5, 0),
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
    const [left, setLeft] = useState(props.data.sympt);
    const [right, setRight] = useState([]);
    const [med, setMed] = useState(' ');

    const leftChecked = intersection(checked, left);
    const rightChecked = intersection(checked, right);

    const inputHandler = (e) => {
        const inp = props.InputStore
        inp.handleInput(e.target.name, e.target.value)
        setMed(e.target.value)
        props.MainStore.addMed(e.target.value)
    }

    const setNewTreat = () => {
        props.MainStore.addMed()
        props.MainStore.goNext()
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

    const handleCheckedLeft = () => {
        setLeft(left.concat(rightChecked));
        setRight(not(right, rightChecked));
        setChecked(not(checked, rightChecked));
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
            Im Medication

            <Autocomplete
                options={props.data.meds}
                className={classes.autocomp}
                getOptionLabel={(option) => option.name}
                style={{ width: 300 }}
                onSelect={inputHandler}
                renderInput={(params) => <TextField {...params} onChange={inputHandler} label="Medication" variant="outlined" />}
            />

            {/* <Autocomplete
                options={top100Films}
                className={classes.autocomp}
                getOptionLabel={(option) => option.title}
                style={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Tips" variant="outlined" />}
            /> */}

            <TextField  className={classes.autocomp} label="Tips" variant="outlined"/>

            <Grid container spacing={2} justify="center" alignItems="center" className={classes.root}>
                <Grid item>{customList('Symptoms', left)}</Grid>
                
                <Grid item>
                    <Grid container direction="column" alignItems="center">
                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                        >
                        &gt;
                    </Button>

                    <Button
                        variant="outlined"
                        size="small"
                        className={classes.button}
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                        >
                        &lt;
                    </Button>

                    </Grid>
                </Grid>
                <Grid item>{customList('Chosen Symptoms', right)}</Grid>
            </Grid>

            {right.map(s => <p>{s.name} {s.freq[0]} / {s.freq[1]}</p>)}

            <Button onClick={setNewTreat} className={classes.btn} variant="contained" color="primary">
                Enter Chosen Symptoms
            </Button>
        </div>
    )
}))
export default Medication