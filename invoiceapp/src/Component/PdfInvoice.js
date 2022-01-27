import React,{useEffect,useState,useRef} from 'react'
import { Button, Col,Table } from 'react-bootstrap';
import {useLocation} from "react-router"
import jwt_decode from 'jwt-decode'
import { Row  } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import ReactToPdf from 'react-to-pdf'
const options = {
    orientation: 'potrait',
    unit: 'in',
    format: 'A4'
};

export default function PdfInvoice() {
    // const user = useSelector(state => state.user)
    
    const location= useLocation();
    const[data,setData]=useState(location.state.state)
    const [logoData, setlogoData] = useState('')
    const ref = React.createRef();
    useEffect(() => {
        // console.log(user);
        if(localStorage.getItem('_token')){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode.uid[0]);
            let logo=decode.uid[0].logo
            console.log(logo);
            setlogoData(logo)
        setData(location.state.state)
       console.log(location.state.state)
        }
    }, [])
    return (
        <div >
            
           
               
            <Row ref={ref}>
                
                <Col lg={6} className='float-left'>
                <img src={`image/${logoData}`} alt="Image not Found" height='200px'  />
                </Col>
                <Col lg={6} className='float-right'>
                    <h2>Invoice NO.</h2>
                    {data.invoice_number}
                </Col>
                <Col lg={6} className='float-left'>
                    <h4>FROM</h4>
                    {data.user_email}
                    <h4>To</h4>
                    {data.Receiver_name}
                </Col>
                <Col lg={6} className='float-right'>
                    <h4>Status</h4>
                    {data.Status}
                    <h4>Date</h4>
                    {data.Invoice_date}
                    <h4>Due Date</h4>
                    {data.Due_date}
                </Col>
                <Col lg={12}>
                    <Table>
                        <thead>
                            <tr>
                            <th>Item</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th>Discount</th>
                            <th>Amount</th></tr>
                        </thead>
                        <tbody>
                            {
                            data.Products.map(element => 
                                <tr>
                                <td>{element.item}</td>
                                <td>{element.Quantity}</td>
                                <td>{element.Price}</td>
                                <td>{element.Discount}</td>
                                <td>{element.Total}</td>
                            </tr>
                            )}
                        </tbody>

                    </Table>
                   
                </Col>
            </Row>
           
        
      
            <ReactToPdf targetRef={ref} filename={`${data.invoice_number}${data.Status}.pdf`} options={options} x={0} y={0} scale={0.8}>
        {({toPdf}) => (
            <Button onClick={toPdf}>Generate pdf</Button>
        )}
    </ReactToPdf> 
        </div>
        
    )
}
