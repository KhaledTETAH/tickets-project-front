import React from "react";
import './Ticket.css';

const Ticket = (props) => {
    
    const divColor = (status = props.status) => {
        switch(status){
            case 1:
                return 'red';
            case 2:
                return 'orange';
            case 3:
                return 'green';
            default:
                return 'red';
        }
    }
    return(
        <div className="ticket-container">
            <div className="status-container" style={{backgroundColor: divColor()}}>
                
            </div>
            <div className="info-container">
                <h5 id="ticket-title">{props.title}</h5>
                <p id="ticket-description">{props.description}</p>
                <p id="ticket-deadline">{props.deadline}</p>
            </div>
        </div>
    )
}

export default Ticket;