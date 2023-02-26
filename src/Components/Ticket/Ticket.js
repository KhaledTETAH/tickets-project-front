import React from "react";
import './Ticket.css';

const Ticket = (props) => {
    
    const divColor = (status = props.status) => {
        switch(status){
            case "created":
                return 'red';
            case "assigned":
                return 'orange';
            case "closed":
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
                <h2>{props.title}</h2>
                <p>{props.description}</p>
                <p>{props.deadline}</p>
            </div>
        </div>
    )
}

export default Ticket;