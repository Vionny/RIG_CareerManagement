import { useRouter } from 'next/navigation';
import {LoginPage} from './Pages/LoginPage';
import {HomePage} from './Pages/HomePage';

function App() {
  
  return (
    <div>
      <LoginPage/>
      {/* <HomePage/> */}
    </div>
  )
}

export default App;
