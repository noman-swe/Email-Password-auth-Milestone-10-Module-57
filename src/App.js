import './App.css';
import app from './firebase.init';
import {getAuth} from 'firebase/auth';

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
    <div className="App">
     <form style={{'marginTop': '20px'}}>
      <input onBlur={handleEmailBlur} type="text" placeholder='Email' /> <br />
      <input onBlur={handlePassBlur} type="password" name="" id="" placeholder='Password'/> <br />
      <input onClick={handleFormSubmit} type="submit" value="Log in" />
     </form>
    </div>
  );
}

export default App;
