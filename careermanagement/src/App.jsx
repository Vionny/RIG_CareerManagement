import { LoginPage } from './Pages/LoginPage';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage/>}/>
                <Route path="/home"></Route>
            </Routes>
        </BrowserRouter>     
  );
}

export default App;
