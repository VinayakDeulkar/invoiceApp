import React,{useRef,useEffect, useState} from 'react'
import { Form ,Button} from 'react-bootstrap'
import jwt_decode from 'jwt-decode'
import { UpdateCompany } from '../config/myservice'
import { useHistory } from 'react-router-dom'

export default function Setting() {
    const companyname = useRef()
    const companyaddress = useRef()
    const history=useHistory()
    const [usermail, setusermail] = useState('')
    useEffect(() => {
        if(localStorage.getItem('_token')){
            let token=localStorage.getItem('_token');
            let decode=jwt_decode(token);
            console.log(decode.uid[0]);
            let data=decode.uid[0]
            setusermail(data.email)
            companyname.current.value=data.companyName
            companyaddress.current.value=data.address
        }
    }, [])
    const updatecompany=()=>{
        let data=new FormData();
        data.append('file', document.getElementById('logo').files[0])
        data.append('companyname',companyname.current.value)
        data.append('companyaddress',companyaddress.current.value)
        
        data.append('email',usermail)
        console.log(data);
        UpdateCompany(data)
        .then(res=>{
            console.log('inside setting');
            localStorage.clear()
            history.push('/')
        })
    }
    return (
        <div>
            <Form className='mt-5 '>

            <Form.Label>Company Logo</Form.Label>
            <input type="file" name='myfile' id="logo" className='mb-1' />
            <Form.Group className="mb-1" >
                <Form.Label>Company Name</Form.Label>
                <Form.Control type="text" name="Name" ref={companyname}  placeholder="Enter companyname"  />
            </Form.Group>
            <Form.Group className="mb-1" >
                <Form.Label>Company Address</Form.Label>
                <Form.Control type="text" name="Name" ref={companyaddress}  placeholder="Enter companyaddress"  />
            </Form.Group>
            <Button onClick={updatecompany} >Make Changes</Button>
            </Form>
        </div>
    )
}
