import { combineReducers } from "redux";
import { ticketsReducer, selectedProductReducer } from "./ticketReducer"; 

const reducers = combineReducers({
    ticketsReducer: ticketsReducer,
    selectedTicketReducer: selectedProductReducer,
});

export default reducers;