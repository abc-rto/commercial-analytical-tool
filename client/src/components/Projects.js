import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';


import DataTable from './DataTable'
import CreateProjectDialog from './CreateProjectDialog';

export default function FormDialog() {
    const [open, setOpen] = React.useState(false);
    const [projects, setProjects] = React.useState([]);


    React.useEffect((projects) => {
        init()
    },[]);

    const init = async () => {
        const res = await axios.get('http://localhost:5001/projects/selectAll').then(res => res.data);
        setProjects(res.projects)
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        console.log(projects)
    };

    return (
        <div>
            <div>
                <DataTable rows={projects}></DataTable>
            </div>
            <div>
                <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                    Create project
                </Button>
                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">Create project</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Fill in project details and submit the form.
                        </DialogContentText>
                        <CreateProjectDialog handleClose={handleClose}></CreateProjectDialog>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        </div>
    );
}
