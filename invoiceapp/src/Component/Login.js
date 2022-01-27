import React,{useState,useRef} from 'react'
import {Card,Form,Button, Row, Col} from 'react-bootstrap'
import { Link, useHistory } from 'react-router-dom'
import { UserLogin } from '../config/myservice'

export default function Login() {
    const [ErrorLogin, setErrorLogin] = useState({Username_error:'',Password_error:''})
    const Username = useRef('')
    const Password = useRef('')
    const history=useHistory()
    const regForEmail=RegExp(/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/);
    const regForPassword=RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/);
    const handler=(event)=>{
        const name=event.target.name;
        switch (name) {
            case "Username":
                let error_for_email=regForEmail.test(Username.current.value)?'':'Enter Valid Email';
                setErrorLogin({
                    ...ErrorLogin, Username_error:error_for_email
                })
                break;
            case "Password":
                let error_for_password=regForPassword.test(Password.current.value)?'':'Enter Valid Password';
                setErrorLogin({
                    ...ErrorLogin, Password_error:error_for_password
                })
                break;
            default:
                break;
        }
    }
    const setnull=(event)=>{
        const name=event.target.name;
        switch (name) {
            case "Username":
                setErrorLogin({
                    ...ErrorLogin, Username_error:''
                })
                break;
            case "Password":
                setErrorLogin({
                    ...ErrorLogin, Password_error:''
                })
                break;
            default:
                break;
        }
    }
    const LoginUser=()=>{
        let data={username:Username.current.value,password:Password.current.value}
        console.log(data);
        UserLogin(data)
        .then(res=>{
            if(res.data.err==0){
                console.log(res.data.token);
                localStorage.setItem('_token',res.data.token)
                history.push('/dashborad')
            }   
        })
    }
    return (
        <div>
            <Row className='mr-5 ml-5' style={{marginTop:"12%"}}>
                <Col lg={3}/>
                <Col lg={6}>
                    <Card  bg='light' style={{ width: '100' }}>
                    <Form className="p-5" >
                        <Form.Label><h2>Login</h2></Form.Label>
                        <Form.Group className="mb-3" >
                            <Form.Label>Username</Form.Label>
                            <Form.Control type="text" name="Username" ref={Username} placeholder="Enter Username" onBlur={handler} onFocus={setnull}/>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorLogin.Username_error}</Form.Label>
                        </Form.Group>
                        <Form.Group className="mb-3" >
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" name="Password" ref={Password} placeholder="Enter Password" onBlur={handler} onFocus={setnull}/>
                        </Form.Group>
                        <Form.Group className="mb-1" >
                            <Form.Label style={{color:"red"}}>{ErrorLogin.Password_error}</Form.Label>
                        </Form.Group>
                        <Button variant="dark" onClick={LoginUser}>
                            Submit
                        </Button>
                    </Form>
                    <label className='text-center'>Don't have account? <Link to="/Register" > Create One</Link> </label>
                    </Card>
                </Col>
                <Col lg={3}/>
            </Row>
            
        </div>
    )
}
