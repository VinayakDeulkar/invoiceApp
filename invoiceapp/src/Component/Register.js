import React,{useState,useRef} from 'react'
import {Card,Form,Button, Row, Col} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom';
import { AddUser } from '../config/myservice';
export default function Register() {
    const [ErrorRegister, setErrorRegister] = useState({Name_error:'',Email_error:'',Password_error:'',ConfirmPassword_error:'',Address_error:'',LastName_error:'',Username_error:''})
    const Name = useRef('')
    const Email = useRef('');
    const LastName = useRef('')
    const Username = useRef('')
    const Password = useRef('')
    const ConfirmPassword = useRef('')
    const Address = useRef('')
    const Image = useRef('')
    const companyname = useRef('')
    const history=useHistory()
    const regForName=RegExp(/[A-Za-z]+/)
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);
    const handler=(event)=>{
        const name=event.target.name
        switch (name) {
            case "Name":
                let error_for_name=regForName.test(Name.current.value)?'':'Enter valid Name';
                setErrorRegister({
                    ...ErrorRegister,Name_error:error_for_name
                })
                break;
            case "Username":
                let error_for_username=regForName.test(Username.current.value)?'':'Enter valid Username';
                setErrorRegister({
                    ...ErrorRegister, Username_error:error_for_username
                })
                break;
            case "Email":
                let error_for_email=regForEmail.test(Email.current.value)?'':'Enter Valid Email';
                setErrorRegister({
                    ...ErrorRegister, Email_error:error_for_email
                })
                break;
            case "LastName":
                let error_for_lastname=regForName.test(LastName.current.value)?'':'Enter Valid Last Name';
                setErrorRegister({
                    ...ErrorRegister, LastName_error:error_for_lastname
                })
                break;
            case "Address":
                    let error_for_Address=regForName.test(Address.current.value)?'':'Enter Valid Address';
                    setErrorRegister({
                        ...ErrorRegister, Address_error:error_for_Address
                    })
                    break;
                    
            case "Password":
                let error_for_password=regForPassword.test(Password.current.value)?'':'Enter Valid Password';
                setErrorRegister({
                    ...ErrorRegister, Password_error:error_for_password
                })
                break;
            case "ConfirmPassword":
                let error_for_confirmpassword=Password.current.value===ConfirmPassword.current.value?'':'Confirm Password must be same as Password'
                setErrorRegister({
                    ...ErrorRegister, ConfirmPassword_error:error_for_confirmpassword
                })
                break;
            default:
                break;
        }
    }
    const setnull=(event)=>{
        const name=event.target.name
        switch (name) {
            case "Name":
                setErrorRegister({
                    ...ErrorRegister,Name_error:''
                })
                break;
            case "Username":
                setErrorRegister({
                    ...ErrorRegister, Username_error:''
                })
                break;
            case "Email":
                setErrorRegister({
                    ...ErrorRegister, Email_error:''
                })
                break;
            case "LastName":
                setErrorRegister({
                    ...ErrorRegister, LastName_error:''
                })
                break;
                case "Address":
                    setErrorRegister({
                        ...ErrorRegister, Address_error:''
                    })
                    break;
            case "Password":
                setErrorRegister({
                    ...ErrorRegister, Password_error:''
                })
                break;
            case "ConfirmPassword":
                setErrorRegister({
                    ...ErrorRegister, ConfirmPassword_error:''
                })
                break;
            default:
                break;
            }
    }
    const RegisterUser=()=>{
        
        let data = new FormData();
        data.append('file', document.getElementById('logo').files[0])
        data.append('name',Name.current.value)
        data.append('lastname',LastName.current.value)
        data.append('username',Username.current.value)
        data.append('companyname',companyname.current.value)
        data.append('companyaddress',Address.current.value)
        data.append('email',Email.current.value)
        data.append('password',Password.current.value)
        if(ErrorRegister.Password_error==''&& ErrorRegister.ConfirmPassword_error=='' && ErrorRegister.Name_error=='' && ErrorRegister.Address_error=='' && ErrorRegister.LastName_error=='' && ErrorRegister.Username_error=='' && ErrorRegister.Email_error==''){
            AddUser(data)
            .then(res=>{
                if(res.data.err==0){
                    history.push('/')
                }
            }
            )
        }
        else{
            alert('Enter valid data')
        }
       
    }
    return (
        <div>
            <Row className='mr-5 ml-5 mt-2'>
                <Col lg={3}/>
                <Col lg={6}>
                    <Card  bg='light' style={{ width: '100' }}>
                    <Form className="p-5"  >
                        <Form.Label><h2>Sign Up</h2></Form.Label>
                        <Form.Group className="mb-1" >
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="text" name="Name" ref={Name}  placeholder="Enter Name" onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Name_error}</Form.Label>
                        </Form.Group>
                        
                        <Form.Group className="mb-1" >
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control type="text" name="LastName" ref={LastName} placeholder="Enter Last Name" onBlur={handler} onFocus={setnull}/>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.LastName_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="Username" ref={Username} placeholder="Enter Username"  onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Username_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" name="Email" ref={Email} placeholder="Enter Email"  onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Email_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Company Name</Form.Label>
                            <Form.Control type="text" name="companyname" ref={companyname} placeholder="Enter Company Name"  onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Address_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label>Company Address</Form.Label>
                            <Form.Control type="text" name="Address" ref={Address} placeholder="Enter Address"  onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Address_error}</Form.Label>
                        </Form.Group>
                        <input type="file" name='myfile' ref={Image} id="logo" className='mb-1' />
                        <Form.Group className="mb-1" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="Password" ref={Password} placeholder="Enter Password"  onBlur={handler} onFocus={setnull} />
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.Password_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-1" controlId="formBasicPassword">
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type="password" name="ConfirmPassword" ref={ConfirmPassword} placeholder="Confirm Password"  onBlur={handler} onFocus={setnull}/>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorRegister.ConfirmPassword_error}</Form.Label>
                        </Form.Group>
                        <Button variant="dark" onClick={RegisterUser} >
                            Submit
                        </Button>
                    </Form>
                    <label className='text-center'>Already Have account? <Link to="/" >Login Now</Link> </label>
                    </Card>
                </Col>
                <Col lg={3}/>
            </Row>
            
        </div>
    )
}
