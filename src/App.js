import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from './firebase.init';
import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import Form from 'react-bootstrap/Form';
import { Button } from 'react-bootstrap';
import { useState } from 'react';

const auth = getAuth(app);
function App() {

  const [validated, setValidated] = useState(false);
  const [registered, setRegistered] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailBlur = event => {
    setEmail(event.target.value);
  }

  const handlePassBlur = event => {
    setPassword(event.target.value);
  }

  const handleNameBlur = event => {
    setName(event.target.value);
  }

  // handleRegisteredChange

  const handleRegisteredChange = event => {
    setRegistered(event.target.checked);
  }

  // handleFormSubmit
  const handleFormSubmit = (event) => {
    if (!name && !email && !password) {
      event.stopPropagation();
      setError('Input all field')
    }
    else {
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
      setValidated(true);
      setError('');

      if (registered) {
        signInWithEmailAndPassword(auth, email, password)
          .then(result => {
            const user = result.user;
            console.log('Welcome logged in Sir', <br />, user);
            setSuccess('Logged in Successfully.');

          })
          .catch(error => {
            setError(error.message);
            console.error(error);
          })
      }
      else {
        createUserWithEmailAndPassword(auth, email, password)
          .then(result => {
            const user = result.user;
            setEmail('');
            setPassword('');
            verifyEmail();
            setSuccess('User Created Successfully');
            setUserName();

            console.log('Thanks for reg.', <br />, user);
          })
          .catch((error) => {
            console.error(error);
            setError(error.message);
          });
      }
      event.preventDefault();
    }

  }
  const forgetPasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        console.log('Reset Message has Sent to your mail');
      })
  }

  const verifyEmail = () => {
    sendEmailVerification(auth.currentUser)
      .then(() => { console.log('Verification code has sent to your Email.') })
  }

  const setUserName = () => {
    updateProfile(auth.currentUser, {
      displayName: name
    })
      .then(() => {
        console.log('Updating Name')
      })
      .catch((error) => setError(error))
  }


  return (
    <div>
      {/* <FormExample></FormExample> */}
      <div className="form-container w-50 mx-auto mt-5 border p-5">
        <h3 className="text-primary">
          Please {registered ? 'Login.' : 'Register.'}
        </h3>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit}>

          {!registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Your Name</Form.Label>
            <Form.Control onBlur={handleNameBlur} type="text" placeholder="Enter name" required />

            <Form.Control.Feedback type="invalid">
              Please provide a name.
            </Form.Control.Feedback>
          </Form.Group>}

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

          <p className='text-success'>{success}</p>
          <p className='text-danger'>{error}</p>

          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered." />
          </Form.Group>

          <Button onClick={forgetPasswordReset} variant="link">Forget Password?</Button> <br />

          <Button variant="primary" type="submit">
            {registered ? 'Login' : 'Register'}
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default App;
