import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from './firebase.init';
import { getAuth } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';

const auth = getAuth(app);
function App() {

  const handleEmailBlur = event => {
    console.log(event.target.value);
  }

  const handlePassBlur = event => {
    console.log(event.target.value);
  }
  const handleFormSubmit = (event) => {
    console.log('Clicked');
    event.preventDefault();
  }

  return (
    <div>
      {/* <FormExample></FormExample> */}
      <div className="form-container w-50 mx-auto mt-5 border p-5">
        <h3 className="text-primary">
          Please Register.
        </h3>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" />
          </Form.Group>
           
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
