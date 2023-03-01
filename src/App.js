import Header from './Components/Header/Header';
import TicketList from './Components/TicketList/TicketList';
import Ticket from './Components/Ticket/Ticket';
import AddTicket from './Components/AddTicket/AddTicket';
import TicketDetails from './Components/TicketDetails/TicketDetails';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomeContainer from './Components/HomeContainer/HomeContainer';
import Login from './Components/Login/Login';
import { useEffect, useState } from 'react';
import PrivateRoute from './Components/Login/PrivateRoute';
import AlreadyLoggedIn from './Components/Login/AlreadyLoggedIn';


function App() {
  //const [user, setUser] = useState();



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
