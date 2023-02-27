import React from "react";
import './TicketDetails.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectedTicket } from "../../redux/actions/ticketActions";


const SELECTED_TICKET_URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const TicketDetails = (props) => {


     const ticket = useSelector((state) => state.selectedTicketReducer); 

/*    const dispatch = useDispatch();    

     console.log("selcted ticket: ", ticket);

    const fetchSelectedTicketDetails = async (id) => {
        const response = await axios
            .get(SELECTED_TICKET_URL+id)
            .catch((error) => {
                console.log(error);
            });
        
        dispatch(selectedTicket(response.data));
    } */

/*    useEffect(() => {
         fetchSelectedTicketDetails(props.ticketId)
    }, [props.ticketId]);
 */
    return(
        <div>
            <h2>Here is Ticket Details</h2>
            <p>ID: {ticket.id}</p>
            <p>Title: {ticket.title}</p>
            <p>Deadline: {ticket.deadline}</p>
        </div>
    )

}

export default TicketDetails;