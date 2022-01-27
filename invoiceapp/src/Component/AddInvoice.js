import React,{useEffect, useRef,useState} from 'react'
import { Button, Form, Table } from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { AddingInvoice } from '../config/myservice'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
export default function AddInvoice() {
    const Revicer_name = useRef('')
    const Revicer_address = useRef('')
    const Due_date = useRef('')
    const item = useRef('');
    const quantity = useRef('')
    const price = useRef('')
    const discount = useRef('')
    const history=useHistory()
    const [Useremail, setUseremail] = useState('')
    const [Rows, setRows] = useState([])
    useEffect(() => {
        if(localStorage.getItem('_token')){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode.uid[0]);
            setUseremail(decode.uid[0].email)
        }
    }, [])
    const AddProduct=()=>{
        let original_price=parseInt(quantity.current.value)*parseInt(price.current.value)
        console.log(original_price);
        let total=original_price-(original_price*discount.current.value/100)
        let data={item:item.current.value,Quantity:quantity.current.value,Price:price.current.value,Discount:discount.current.value,Total:total}
        setRows([...Rows,data])
        item.current.value=''
        quantity.current.value=''
        price.current.value=''
        discount.current.value=''
    }
    const DeleteProduct=(indexs)=>{
        let data=Rows.filter((ele,index)=>index!=indexs)
        console.log(data);
        setRows(data)
    }
    const Addinvoice=()=>{
        let data={
            Revicer_name:Revicer_name.current.value,
            user_email:Useremail,
            Revicer_address:Revicer_address.current.value,
            Due_date:Due_date.current.value,
            Products:Rows}
        console.log(data);
        AddingInvoice(data)
        .then(res=>{
            history.push('/dashborad')
        })
    }
    
    return (
        <div>
            <Form className="p-5" >
                            <Form.Label><h2>Add Invoice</h2></Form.Label>
                        <Form.Group className="mb-1" >
                            <Form.Label>Revicer Name</Form.Label>
                            <Form.Control type="text" name="Revicer_name" ref={Revicer_name}  placeholder="Enter Revicer Name"  />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Revicer Address</Form.Label>
                            <Form.Control type="text" name="Revicer_address" ref={Revicer_address}  placeholder="Enter Revicer Address"  />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Due Date </Form.Label>
                            <Form.Control type="date" name="Due_date" ref={Due_date}  placeholder="Enter Due Date "  />
                        </Form.Group>
                        <Form.Group className="mb-1">
                            <Form.Label>Add Product List</Form.Label>
                            <Table>
                            <tbody> 
                                    <tr>
                                    <td>
                                        <Form.Control type="text" name="item" ref={item}  placeholder="Enter item "  />
                                    </td>
                                    <td>
                                        <Form.Control type="text" name="quantity" ref={quantity} placeholder="Enter quantity "  />
                                    </td>
                                    <td>
                                        <Form.Control type="text" name="price" ref={price} placeholder="Enter price "  />
                                    </td>
                                    <td>
                                        <Form.Control type="text" name="discount" ref={discount} placeholder="Enter discount "  />
                                    </td>
                                    <td>
                                        <Button onClick={AddProduct}>Add Product</Button>
                                    </td>
                                    </tr>
                            </tbody>
                            </Table>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Table>
                                <thead>
                                    <th>Item</th>
                                    <th>Quantity</th>
                                    <th>Price</th>
                                    <th>Dicount</th>
                                    <th>Total</th>
                                    <th></th>
                                </thead>
                                <tbody>
                                    {
                                        Rows.map((element,indexs)=>(
                                            <tr key={indexs}>
                                                <td>{element.item}</td>
                                                <td>{element.Quantity}</td>
                                                <td>{element.Price}</td>
                                                <td>{element.Discount}</td>
                                                <td>{element.Total}</td>
                                                <td><Button onClick={()=>DeleteProduct(indexs)}>Delete</Button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </Table>
                        </Form.Group>
                        <Button onClick={Addinvoice}>Add Invoice</Button>
                    </Form>
        </div>
    )
}
