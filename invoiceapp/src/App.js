import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './Component/Register';
import Login from './Component/Login';
import {BrowserRouter as Router,Route, Switch} from 'react-router-dom'
import NotFound from './Component/NotFound';
import Dashborad from './Component/Dashborad';
import AddInvoice from './Component/AddInvoice';
import { Container } from 'react-bootstrap';
import PdfInvoice from './Component/PdfInvoice';
import Setting from './Component/Setting';
function App() {
  return (
    <div className='mr-5'>
      <Router>
        <Container>
        <Switch>
          <Route path="/" exact component={Login}/>
          <Route path='/Register' exact component={Register}/>
          <Route path='/dashborad' exact component={Dashborad}/>
          <Route path='/addinvoice' exact component={AddInvoice}/>
          <Route path='/Pdfcreate' exact component={PdfInvoice}/>
          
          <Route path='/Setting' exact component={Setting}/>
           <Route path='*' exact component={NotFound}/>
        </Switch>
        </Container>
        
      </Router>
    </div>
  );
}

export default App;
