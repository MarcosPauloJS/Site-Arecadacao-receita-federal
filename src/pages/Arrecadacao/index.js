import React, { useState, useEffect } from 'react';

// Ag-Grid
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';

// Matrerial UI



import api from '../../services/api'


function Collection(){
    const [ columnDefs, setColumnDefs] = useState([]);
    const [ rowData, setRowData] = useState([]);

    function organizeData(data){
        let dataForGrid = []
        // console.log(data)
        data.forEach( (item, indexRow) =>{
            item.forEach( (item, indexColumn) =>{
                if(indexColumn === 0){
                    dataForGrid[indexRow] = {[`field${indexColumn}`]: item};
                }
                else{
                    dataForGrid[indexRow][`field${indexColumn}`] = item;
                }        
            })
        })

        let countForInObject = 0
        let jsonColumnDefs = [];

        for( let ts in dataForGrid[0]){
            if(countForInObject === 0){
                jsonColumnDefs[0] = {'headerName': dataForGrid[0][ts], field: `field${countForInObject}`, sortable: true, filter: true, checkboxSelection: true};
            }
            else{
                jsonColumnDefs.push({'headerName': dataForGrid[0][ts], field: `field${countForInObject}`, sortable: true, filter: true, checkboxSelection: true});
            }
            countForInObject ++;
        }
        setColumnDefs(jsonColumnDefs)
        dataForGrid.shift();

        setRowData(dataForGrid)


        console.log(dataForGrid)
    }

    const alt = true;
    useEffect(()=>{
        api.get('receitafederal/arrecadacao')
            .then( response =>{
                organizeData(response.data.agroupData);
               
            })
    },
    [alt]
    );


    return (
        <div
        className="ag-theme-balham"
        style={{
        height: '90vh',
        width: '100%' }}
      >
        <AgGridReact 
            rowSelection="multiple"
            columnDefs={columnDefs}
            rowData={rowData}>

        </AgGridReact>
      </div>

    );

   
}

export default Collection;