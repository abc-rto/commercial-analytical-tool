import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SimpleSelect() {
    const classes = useStyles();
    const [items, setItems] = React.useState([]);
    const [item, setItem] = React.useState();


    React.useEffect((items) => {
        init()
    },[]);

    const init = async () => {
        const res = await axios.get('http://localhost:5001/upload/files').then(res => res.data);
        setItems(res)
    }

    const handleChange = (event) => {
        setItem(event.target.value);
    };


    return (
        <div>
            <label>Select a File</label>
            <br></br>
            <FormControl className={classes.formControl}>
                <InputLabel id="demo-simple-select-label">File</InputLabel>
                <Select value={item} onChange={handleChange}>
                    {items.map((item, keyIndex) => {
                        return (<MenuItem key={keyIndex} value={item.id}>{item.name}</MenuItem>);
                    })}
                </Select>
            </FormControl>
        </div>
    );
}