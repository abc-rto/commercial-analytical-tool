import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import qs from 'qs';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


import EditProjectDialog from './EditProjectDialog';

export default function DataTable(props) {

  const [openEdit, setOpenEdit] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);
  const [selectedRow, setSelectedRow] = React.useState({})

  const renderEditButton = (params) => {

    const handleClickOpen = () => {
      const data = {name: params.row.name, ref: params.row.ref}
      setOpenEdit(true);
    };

    const handleClose = () => {
      setOpenEdit(false);
    };

    return (
      <strong>
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Edit
          </Button>
          <Dialog open={openEdit} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText>
                Edit project details and submit
              </DialogContentText>
              <EditProjectDialog init={props.init} handleClose={handleClose} selectedRow={selectedRow} handleClose={handleClose}></EditProjectDialog>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </strong>
    )
  }

  const renderDeleteButton = (params) => {

    const handleClickOpen = () => {
      setOpenDelete(true);
    };

    const handleClose = () => {
      setOpenDelete(false);
    };

    const onDelete = async () => {
      console.log(params.row.id)
      await axios.get('http://localhost:5001/projects/delete', {
        params: {
          id: params.row.id
        },
        paramsSerializer: params => {
          return qs.stringify(params)
        }
      }).then(res => res.data);

      props.init()
      handleClose()
    }

    return (
      <strong>
        <div>
          <Button variant="outlined" color="primary" onClick={handleClickOpen}>
            Delete
          </Button>
          <Dialog open={openDelete} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogContent>
              <DialogContentText>
                Are you sure?
              </DialogContentText>
              <Button
                variant="contained"
                color="primary"
                size="small"
                style={{ marginLeft: 16 }}
                onClick={onDelete}
              >
                Delete
              </Button>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>
        </div>
      </strong>
    )
  }

  const renderSelectButton = (params) => {

    const handleSelect = () => {
      props.setSelectedProject(params.row.id)
      props.setExpanded('panel2')
    }

    return (
      <strong>
        <div>
          <Button variant="outlined" color="primary" onClick={handleSelect}>
            Select
          </Button>
        </div>
      </strong>
    )
  }

  const columns = [
    { field: 'id', headerName: 'ID', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
    { field: 'ref', headerName: 'Reference', width: 150 },
    {
      field: 'delete',
      headerName: 'Delete',
      width: 150,
      renderCell: renderDeleteButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'edit',
      headerName: 'Edit',
      width: 150,
      renderCell: renderEditButton,
      disableClickEventBubbling: true,
    },
    {
      field: 'select',
      headerName: 'Select',
      width: 150,
      renderCell: renderSelectButton,
      disableClickEventBubbling: true,
    }
  ];

  return (
    <div style={{ height: 400, width: 900 }}>
      <DataGrid onRowSelected={(x) => setSelectedRow(x.api.current.getSelectedRows()) } rows={props.rows} columns={columns} pageSize={10} />
    </div>
  );
}
