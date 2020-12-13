import React, { useState, useEffect } from 'react';
import MaterialTable from 'material-table';
import Icons from '@material-ui/icons';
import { AddBox, ArrowDownward } from "@material-ui/icons";
import { forwardRef } from 'react';
import Check from '@material-ui/icons/Check';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import ChevronRight from '@material-ui/icons/ChevronRight';
import Clear from '@material-ui/icons/Clear';
import DeleteOutline from '@material-ui/icons/DeleteOutline';
import Edit from '@material-ui/icons/Edit';
import FilterList from '@material-ui/icons/FilterList';
import FirstPage from '@material-ui/icons/FirstPage';
import LastPage from '@material-ui/icons/LastPage';
import Remove from '@material-ui/icons/Remove';
import SaveAlt from '@material-ui/icons/SaveAlt';
import Search from '@material-ui/icons/Search';
import ViewColumn from '@material-ui/icons/ViewColumn';
import Train from './Train';

const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => <DeleteOutline {...props} ref={ref} />),
    DetailPanel: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => <ChevronLeft {...props} ref={ref} />),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => <ArrowDownward {...props} ref={ref} />),
    ThirdStateCheck: forwardRef((props, ref) => <Remove {...props} ref={ref} />),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />)
  };

function Home() {
const [data, setData] = useState([]);

useEffect(() => fetchData(), []);

const fetchData = () => {
    fetch('https://customerrest.herokuapp.com/api/customers/')
    .then(response => response.json())
    .then(data => setData(data.content))
    }


const columns = [
        {
            title: 'Firstname',
            field: 'firstname'
        },
        {
            title: 'Lastname',
            field: 'lastname'
        },
        {
            title: 'Address',
            field: 'streetaddress'
        },
        {
            title: 'Postcode',
            field: 'postcode'
        },
        {
            title: 'City',
            field: 'city'
        },
        {
            title: 'Email',
            field: 'email'
        },
        {
            title: 'Phone',
            field: 'phone'
        },
        
        
    ]




    
return (
    <div style={{ maxWidth: '100%' }}>
        <MaterialTable
          icons={tableIcons}
          columns={columns}
          data={data}
          title="Customers"
          editable={{
            onRowAdd: newData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  fetch('https://customerrest.herokuapp.com/api/customers/',{
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(newData)
                    })   
                    .then (res => fetchData())
                    .catch(err => console.error(err))
                  
                  resolve();
                }, 1000)
              }),
            onRowUpdate: (newData, oldData) =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  console.log(oldData.links[0].href);
                  fetch(`${oldData.links[0].href}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(newData)
                })   
                .then (res => fetchData())
                .catch(err => console.error(err))
                resolve();
              }, 1000)
              }),
            onRowDelete: oldData =>
              new Promise((resolve, reject) => {
                setTimeout(() => {
                  fetch(`${oldData.links[0].href}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    })   
                .then (res => fetchData())
                .catch(err => console.error(err))
                  
                  resolve()
                }, 1000)
              }),
          }}
          detailPanel={[
            {
          tooltip: 'Show Trainings',
          render: rowData => {
            return (
              <div>
                <Train data={rowData}/>
              </div>
            )
              },
            },
          ]}
          />
      </div>
);
}
export default Home;