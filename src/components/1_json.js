import React, { useState } from 'react'
import {Paper, TextField, Button} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';


const sample = {
    purchaseOrder: {
        customer: {
            uid: '022343',
            name: "Tim Westhoff",
            address: {
                street: "Werner-von-Siemens-Str. 1",
                city: "80333 Muenchen"
            },
        },
        supplier: {
            name: "Technische Hochschule Ulm",
            address: {
                street: "Prittwitzstraße 10",
                city: "89075 Ulm"
            },
        },
        items: [
            {
                partNumber: "123",
                description: "Kugelschreiber",
                qty: 4
            },
            {
                partNumber: "132",
                description: "BIS Skript",
                qty: 1
            },
            {
                partNumber: "231",
                description: "Schreibblock",
                qty: 5
            },
            {
                partNumber: "321",
                description: "Ordner",
                qty: 2
            }
        ]
    }
}

export default function Json(){
    const [jsonInput, setJsonInput] = useState("")
    const [convertedJSON, setConvertedJSON] = useState({purchaseOrder: {}})
    const {purchaseOrder} = convertedJSON
    console.log("--> JSON solution:")
    console.log(sample)

    const handleConvertJson = () => {
        try {
            const converted = JSON.parse(jsonInput)
            if (converted.purchaseOrder){
                setConvertedJSON(JSON.parse(jsonInput))
            }
        } catch (error) {
            alert("Not a valid JSON format")
        }
      
    }


    return(

                <Paper style={{height: "500px", padding: "2rem"}}>
                    <h3>Practice JSON</h3>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{width: "300px"}}>
                            <TextField fullWidth label="JSON Input Field" variant="filled" rows={20} rowsMax={20} multiline value={jsonInput} onChange={(e) => setJsonInput(e.target.value)}/>
                        </div>
                        <div style={{margin: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{marginBottom: "1rem"}}>
                                <Button onClick={handleConvertJson} variant="contained" color="primary">Send</Button>
                            </div>
                            <div>
                                <Button onClick={()=> setConvertedJSON({purchaseOrder: {}})} variant="outlined" color="primary">Clear</Button>
                            </div>
                        </div>
                        <div style={{height: "380px", width: "300px", overflow: "auto", border: "1px solid gray", padding: "1rem", borderRadius: "5px"}}>
                            <h3>
                                Purchase Order {purchaseOrder.id && `No. ${purchaseOrder.id}`}
                            </h3>
                            <div style={{marginBottom: "1rem"}}>
                                <div style={{fontWeight: "bold", marginBottom: ".5rem"}}>
                                    Customer
                                </div>
                                {purchaseOrder.customer && 
                                <>
                                    <div>
                                        {purchaseOrder.customer.name}
                                    </div>
                                    {purchaseOrder.customer.address && 
                                    <div>
                                        {purchaseOrder.customer.address.street} <br/>
                                        {purchaseOrder.customer.address.city}
                                    </div>
                                    }
                                </>}
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                            <div style={{fontWeight: "bold", marginBottom: ".5rem"}}>
                                    Supplier
                                </div>
                                {purchaseOrder.supplier && 
                                <>
                                <div>
                                    {purchaseOrder.supplier.name}
                                </div>
                                {purchaseOrder.supplier.address && 
                                    <div>
                                        {purchaseOrder.supplier.address.street} <br/>
                                        {purchaseOrder.supplier.address.city}
                                    </div>
                                    }
                                </>}
                            </div>
                            <div style={{marginBottom: "1rem"}}>
                                <div style={{fontWeight: "bold"}}>
                                    Items
                                </div>
                                 <TableContainer>
                                    <Table>
                                        <TableHead>
                                        <TableRow>
                                            <TableCell style={{fontWeight: "bold"}}>Part #</TableCell>
                                            <TableCell style={{fontWeight: "bold"}}>Description</TableCell>
                                            <TableCell align="right" style={{fontWeight: "bold"}}>Quantity</TableCell>
                                        </TableRow>
                                        </TableHead>
                                        <TableBody>
                                        {purchaseOrder.items && Array.isArray(purchaseOrder.items) &&
                                            purchaseOrder.items.map(({partNumber, description, qty}, index)=> (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {partNumber}
                                                </TableCell>
                                                <TableCell >{description}</TableCell>
                                                <TableCell align="right">{qty}</TableCell>
                                            </TableRow>
                                        ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </div>
                        </div>
                    </div>
                    
                </Paper>
    )
}