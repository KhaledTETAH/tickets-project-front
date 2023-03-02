import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './Components/HomeContainer/HomeContainer';
import Login from './Components/Login/Login';
import PrivateRoute from './Components/Login/PrivateRoute';
import AlreadyLoggedIn from './Components/Login/AlreadyLoggedIn';


function App() {



  return (
    <div className="App"> 
        <>
          <BrowserRouter>         
            <Routes>
              <Route path='/'  element={
                <AlreadyLoggedIn>
                  <Login />
                </AlreadyLoggedIn>
                
              } />

              <Route path='/home'  element={
                <PrivateRoute>
                  <HomeContainer />
                </PrivateRoute>
              } />

              
            </Routes>
          </BrowserRouter> 
        </>   
    </div>
  );
}

export default App;
