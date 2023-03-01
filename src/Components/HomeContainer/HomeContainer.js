import React from "react";
import TicketList from "../TicketList/TicketList";
import TicketDetails from "../TicketDetails/TicketDetails";
import AddTicket from "../AddTicket/AddTicket";
import './HomeContainer.css';
import { useSelector } from "react-redux";import Header from "../Header/Header";
import { useState } from "react";


const HomeContainer = () => {

    const selectedTicket = useSelector((state) => state.selectedTicketReducer.selectedTicket);
    const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
    const ticketsState = useSelector((state) => state.ticketsReducer);


    return (
        <>
            <Header />
            <div className="home-container">
                <div className="left-container">
                    <TicketList />
                </div>
                <div className="right-container">
                    {(Object.keys(selectedTicket).length === 0) ? 
                        ((user.groups.includes(1)) ?
                            <AddTicket />:
                            null
                          )  : 
                        <TicketDetails />}
                </div>
            </div>
        </>

    )
};

export default HomeContainer;