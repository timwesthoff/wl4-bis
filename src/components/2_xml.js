import React, { useState } from 'react'
import {Paper, TextField, Button} from '@material-ui/core'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import convert from 'xml-js';


const sample = `<purchaseOrder>
<customer uid="022343">
<name>Tim Westhoff</name>
<address>
<street>Werner-von-Siemens-Str. 1</street>
<city>80333 Muenchen</city>
</address>
</customer>
<supplier>
<name>Technische Hochschule Ulm</name>
<address>
<street>Prittwitzstraße 10</street>
<city>89075 Ulm</city>
</address>
</supplier>
<items>
<item>
<partNumber>123</partNumber>
<description>Kugelschreiber</description>
<qty>4</qty>
</item>
<item>
<partNumber>132</partNumber>
<description>BIS Skript</description>
<qty>1</qty>
</item>
<item>
<partNumber>231</partNumber>
<description>Schreibblock</description>
<qty>5</qty>
</item>
<item>
<partNumber>321</partNumber>
<description>Ordner</description>
<qty>2</qty>
</item>
</items>
</purchaseOrder>`

export default function Xml(){
    const [xmlInput, setXMLInput] = useState("")
    const initialObject = {purchaseOrder: {}}
    const [convertedXML, setConvertedXML] = useState(initialObject)
    const {purchaseOrder} = convertedXML
    
    console.log("--> XML solution:")
    console.log(sample)

    const handleConvertXML = () => {
        const options = {ignoreComment: true, compact: true};
        const converted = convert.xml2js(xmlInput.replace(/`/g, ""), options);
        console.log(converted)
        if (converted.purchaseOrder){
            setConvertedXML(converted)
        } else {
            setConvertedXML(initialObject)
        }
    }

    return(

                <Paper style={{height: "500px", padding: "2rem"}}>
                    <h3>Practice XML</h3>
                    <div style={{display: "flex", alignItems: "center"}}>
                        <div style={{width: "300px"}}>
                            <TextField fullWidth label="XML Input Field" variant="filled" rows={20} rowsMax={20} multiline value={xmlInput} onChange={(e) => setXMLInput(e.target.value)}/>
                        </div>
                        <div style={{margin: "0 1rem", display: "flex", flexDirection: "column", alignItems: "center"}}>
                            <div style={{marginBottom: "1rem"}}>
                                <Button onClick={handleConvertXML} variant="contained" color="primary">Send</Button>
                            </div>
                            <div>
                                <Button onClick={() => setConvertedXML({purchaseOrder: {}})} variant="outlined" color="primary">Clear</Button>
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
                                        {purchaseOrder.customer.name._text}
                                    </div>
                                    {purchaseOrder.customer.address && 
                                    <div>
                                        {purchaseOrder.customer.address.street._text} <br/>
                                        {purchaseOrder.customer.address.city._text}
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
                                    {purchaseOrder.supplier.name._text}
                                </div>
                                {purchaseOrder.supplier.address && 
                                    <div>
                                        {purchaseOrder.supplier.address.street._text} <br/>
                                        {purchaseOrder.supplier.address.city._text}
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
                                        {purchaseOrder.items && purchaseOrder.items.item &&  Array.isArray(purchaseOrder.items.item) &&
                                            purchaseOrder.items.item.map(({partNumber, description, qty}, index)=> (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">
                                                    {partNumber._text}
                                                </TableCell>
                                                <TableCell >{description._text}</TableCell>
                                                <TableCell align="right">{qty._text}</TableCell>
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