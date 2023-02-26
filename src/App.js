import Header from './Components/Header/Header';
import TicketList from './Components/TicketList/TicketList';
import Ticket from './Components/Ticket/Ticket';
import TicketDetails from './Components/TicketDetails/TicketDetails';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/'  element={<TicketList />} />
          <Route path='/details'  element={<TicketDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
