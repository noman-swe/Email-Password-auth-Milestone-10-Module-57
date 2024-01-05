import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);
function App() {

  const [validated, setValidated] = useState(false);
  const [error, setError] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePassBlur = event => {
    setPassword(event.target.value);
  }

  // handleFormSubmit
  const handleFormSubmit = (event) => {
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
    }
    if (!/(?=.*[!@#$&*])/.test(password)) {
      // console.log('Use Password with special character');
      setError('Use Password with special character');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then(result => {
        const user = result.user;
        console.log(user);
      })
      .catch((error) => {
        // console.error(error);
      });
    event.preventDefault();
    setValidated(true);
  }

  return (
    <div>
      {/* <FormExample></FormExample> */}
      <div className="form-container w-50 mx-auto mt-5 border p-5">
        <h3 className="text-primary">
          Please Register.
        </h3>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
              Please provide a Email.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword"  >
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePassBlur} type="password" placeholder="Password" autoComplete="on" required />
            <Form.Control.Feedback type="invalid">
              Please provide a password.
            </Form.Control.Feedback>
          </Form.Group>
          
          <p className='text-danger'>{error}</p>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
