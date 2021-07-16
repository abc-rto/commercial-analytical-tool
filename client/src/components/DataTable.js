import * as React from 'react';
import { DataGrid } from '@material-ui/data-grid';

const columns = [
  { field: 'name', headerName: 'name'},
  { field: 'ref', headerName: 'reference'}
];

// const rows = [
//   { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
//   { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
//   { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
//   { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
//   { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: 2 },
//   { id: 6, lastName: 'Melisandre', firstName: 'dave', age: 150 },
//   { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
//   { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
//   { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
// ];

// const rows = []

export default function DataTable(props) {
  return (
    <div style={{ height: 400, width: 500 }}>
      <DataGrid rows={props.rows} columns={columns} pageSize={10} checkboxSelection  />
    </div>
  );
}
