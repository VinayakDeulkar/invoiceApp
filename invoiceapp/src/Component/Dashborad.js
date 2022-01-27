import React,{useEffect, useRef, useState} from 'react'
import jwt_decode from 'jwt-decode'
import { useDispatch,useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { ChangeStatus, GetInvoice } from '../config/myservice';
import { Button, Card, Col, Nav, Navbar, Row, Table,Modal, Form } from 'react-bootstrap';
import { BsGear } from 'react-icons/bs'
export default function Dashborad() {
    const invoice=useSelector((state)=>state.invoice)
    const user = useSelector(state => state.user)
    const [InvoiceData, setInvoiceData] = useState('')
    const [paymentReceived, setpaymentReceived] = useState('')
    const [pendingPayment, setpendingPayment] = useState('')
    const [TotalAMount, setTotalAMount] = useState('')
    const [invoiceCount, setinvoiceCount] = useState('')
    const [PaidCount, setPaidCount] = useState('')
    const [UnpaidCount, setUnpaidCount] = useState('')
    const [PartialCount, setPartialCount] = useState('')
    const [modalShow, setModalShow] = useState(false);
    const [statuspartial, setstatuspartial] = useState(false)
    const [StatusID, setStatusID] = useState('')
    const [Flag, setFlag] = useState(false)
    const payingAmount = useRef('')
    const dispatch=useDispatch()
    const history=useHistory()
    const addinvoice=()=>{
        history.push('/addinvoice')
    }
    useEffect(() => {
        if(localStorage.getItem('_token')){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode.uid[0]);
            let data={email:decode.uid[0].email}
            dispatch({type:"adduser",payload:decode.uid[0]})
            console.log(user);
            GetInvoice(data)
            .then(res=>{
                console.log(res.data.invoicedata);
                let allinvoice=res.data.invoicedata
                setInvoiceData(res.data.invoicedata)
                dispatch({type:"getinvoice",payload:allinvoice})
                let received=0;
                let pending=0;
                let count=0;
                let unpaidcount=0;
                let paidcount=0;
                let partialpaid=0;
                allinvoice.map((ele)=>{
                    received+=parseInt(ele.paid_amount)
                    pending+=parseInt(ele.remaining_amount)
                    count++
                    if(ele.Status==="Unpaid"){
                        unpaidcount++
                    }
                    else if(ele.Status==="Paid"){
                        paidcount++
                    }
                    else{
                        partialpaid++
                    }
                }
                )
                setpendingPayment(pending)
                setpaymentReceived(received)
                let totalamount=received+pending
                setTotalAMount(totalamount)
                setinvoiceCount(count)
                setUnpaidCount(unpaidcount)
                setPaidCount(paidcount)
                setPartialCount(partialpaid)
            })
            
            
        }
    }, [])
    const createPdf=(data)=>{
        localStorage.setItem('invoicedata',JSON.stringify(data))
        history.push('/Pdfcreate',{state:data})
    }
    const LogOut=()=>{
        localStorage.clear();
        history.push('/')
    }
    const EditStatus=(data)=>{
        setModalShow(true)
        setStatusID(data)
    }
    const StatusChanged=()=>{
        if(payingAmount.current.value){
            console.log('PartialPaid');
            let data={amount:payingAmount.current.value,status:"PartialPaid",id:StatusID}
            ChangeStatus(data)
            .then(res=>{
                history.push('/dashborad')
            })
        }
        else{
            console.log('paid');
            let data={status:"Paid",id:StatusID}
            ChangeStatus(data)
            .then(res=>{
                history.push('/dashborad')
            })
        }
    }

    const setting=()=>{
        history.push('/Setting')
    }
    return (
        <div>
            <Navbar className='border'>
                <Nav className='me-auto'>
                <Navbar.Brand >Invoice Data</Navbar.Brand>
                </Nav>
                <Nav>
                    <Button variant='outline-dark' className='m-1' onClick={setting}><BsGear /></Button>
                    <Button variant='outline-dark' className='m-1' onClick={LogOut}>Logout</Button>
                </Nav>
            </Navbar>
            <Row className='mt-5'>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                            <h2>{paymentReceived}</h2>
                            <p style={{fontSize:'10px'}}>Received Payment</p>
                        </Card.Title>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                        <h2>{pendingPayment}</h2>
                        <p style={{fontSize:'10px'}}>Pending Payment</p>
                        </Card.Title>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                            <h2>{TotalAMount}</h2>
                            <p style={{fontSize:'10px'}}>Total Amount</p>
                        </Card.Title>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                            <h2>{invoiceCount}</h2>
                            <p style={{fontSize:'10px'}}>Total Invoices</p>
                        </Card.Title>
                    </Card>
                </Col>
                
            </Row>
            <Row className='mt-3'>
            <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                        <h2>{PaidCount}</h2>
                        <p style={{fontSize:'10px'}}>Paid Invoices</p>
                        </Card.Title>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                            <h2>{UnpaidCount}</h2>
                            <p style={{fontSize:'10px'}}>Unpaid Invoices</p>
                        </Card.Title>
                    </Card>
                </Col>
                <Col lg={3}>
                    <Card>
                        <Card.Title className='text-center'>
                            <h2>{PartialCount}</h2>
                            <p style={{fontSize:'10px'}}>Partial Paid Invoices</p>
                        </Card.Title>
                    </Card>
                </Col>
            </Row>
            <h3 className='mt-3'>Total Invoices</h3><br/>
            <Table>
                <thead>
                    <th>Invoice Number</th>
                    <th>Receiver Name</th>
                    <th>Receiver Address</th>
                    <th>Invoice Date</th>
                    <th>Due date</th>
                    <th>Paid Amount</th>
                    <th>Amount</th>
                    <th>Status</th>
                    <th></th>
                </thead>
                <tbody>
                    {InvoiceData && InvoiceData.map((ele)=>
                        <tr key={ele._id}>
                            <td>{ele.invoice_number}</td>
                            <td>{ele.Receiver_name}</td>
                            <td>{ele.Receiver_Address}</td>
                            <td>{ele.Invoice_date}</td>
                            <td>{ele.Due_date}</td>
                            <td>{ele.paid_amount}</td>
                            <td>{ele.remaining_amount}</td>
                            <td>{ele.Status}</td>
                            <td><Button onClick={()=>createPdf(ele)}>Show details</Button></td>
                            {ele.Status!=="Paid"?
                            <td><Button onClick={() => EditStatus(ele.invoice_number) }>Edit Status</Button></td>:<td></td>}
                        </tr>
                    )}
                </tbody>
            </Table>

            <Button className='rounded-circle ' style={{marginLeft:'95%'}} onClick={addinvoice}>+</Button>
            
            <Modal
                size="lg"
                show={modalShow}
                onHide={() => setModalShow(false)}
                aria-labelledby="example-modal-sizes-title-lg"
            >
                <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                    Edit the status of payment
                </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form  onSubmit={StatusChanged}>
                        <input type="radio" id="Paid" name="Status" onChange={()=>setstatuspartial(false)} value="Paid"/>
                        <label for="Paid">Paid</label><br/>
                        <input type="radio" id="PartialPaid" name="Status" onChange={()=>setstatuspartial(true)} value="PartialPaid"/>
                        <label for="PartialPaid">PartialPaid</label><br/>
                        {
                            statuspartial?(<input type="text" name='paying_amount' ref={payingAmount} placeholder='paying amount'/>):''
                        }<br/>
                        <Button type="submit">Change status</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        </div>
    )
}
