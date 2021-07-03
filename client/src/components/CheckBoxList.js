import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import axios from 'axios';
import qs from 'qs'

import * as actions from '../actions';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxList() {

    const classes = useStyles();
    const [checked, setChecked] = React.useState([0]);
    const [labels, setLabels] = React.useState([]);

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

    const onClickHandler = async () => {
        const inverters = await axios.get('http://localhost:5001/upload/inverters').then(res => res.data);
        setLabels(inverters)
    }

    const fetchDataHandler = () => {
        console.log(checked)
        axios.get('http://localhost:5001/upload/fetchData', {
            params: {
              storeIds: checked
            },
            paramsSerializer: params => {
              return qs.stringify(params)
            }
          })
    }

    return (
        <div class="container">
            <label>Scan File For Inverters</label>
            <br></br>
            <button type="button" class="btn btn-success btn-block" onClick={onClickHandler}>Scan</button>
            <br></br>
            <br></br>
            <label>Select Solar Inverters</label>
            <List className={classes.root}>
                {labels.map((value) => {
                    const labelId = `checkbox-list-label-${value}`;
                    return (
                        <ListItem key={value} role={undefined} dense button onClick={handleToggle(value)}>
                            <ListItemIcon>
                                <Checkbox
                                    edge="start"
                                    checked={checked.indexOf(value) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{ 'aria-labelledby': labelId }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={value} />
                            <ListItemSecondaryAction>
                                <IconButton edge="end" aria-label="comments">
                                </IconButton>
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
            <button type="button" class="btn btn-success btn-block" onClick={fetchDataHandler}>Fetch data</button>
        </div>
    );
}