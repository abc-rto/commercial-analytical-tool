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

import { Container, Row, Col } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import * as actions from '../actions';

import BarChart from './BarChart'


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}));

export default function CheckboxList() {

    const classes = useStyles();
    var [checked, setChecked] = React.useState([0]);
    const [labels, setLabels] = React.useState([]);
    const [datasets, setDatasets] = React.useState([]);
    const [dataLabels, setDatalabels] = React.useState([]);

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

    const selectAll = () => {
        if (checked.length - 1 < labels.length) {
            var newChecked = [0].concat(labels)
            setChecked(newChecked)
        } else if (checked.length - 1 == labels.length) {
            setChecked([0])
        }
    }

    const fetchDataHandler = async () => {
        const dataPoints = await axios.get('http://localhost:5001/upload/fetchData', {
            params: {
                inverters: checked
            },
            paramsSerializer: params => {
                return qs.stringify(params)
            }
        }).then(res => res.data);

        var data = JSON.parse(dataPoints)
        console.log(data.xVals)
        setDatasets(data.datasets)
        setDatalabels(data.labels)
    }

    return (
        <div class="container">
            <button type="button" class="btn btn-success btn-block" onClick={fetchDataHandler}>Preview</button>
            <BarChart labels={dataLabels} datasets={datasets} />
        </div>
    );
}