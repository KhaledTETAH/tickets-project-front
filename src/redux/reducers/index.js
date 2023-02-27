import { combineReducers } from "redux";
import { ticketsReducer, selectedTicketReducer, filterTicketsByStatusReducer } from "./ticketReducer"; 

const reducers = combineReducers({
    ticketsReducer: ticketsReducer,
    selectedTicketReducer: selectedTicketReducer, 
    /* filterTicketsByStatusReducer: filterTicketsByStatusReducer, */
});

export default reducers;