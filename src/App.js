import './App.css';
import app from './firebase.init';
import {getAuth} from 'firebase/auth';

const auth = getAuth(app);
function App() {
  return (
    <div className="App">
     <form>
      <input type="text" placeholder='Email' />
      <input type="password" name="" id="" placeholder='Password'/>
     </form>
    </div>
  );
}

export default App;
