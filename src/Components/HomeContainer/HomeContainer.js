import React from "react";
import TicketList from "../TicketList/TicketList";
import TicketDetails from "../TicketDetails/TicketDetails";
import AddTicket from "../AddTicket/AddTicket";
import './HomeContainer.css';
import { useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { removeSelectedTicket } from "../../redux/actions/ticketActions";
import Header from "../Header/Header";

const HomeContainer = () => {

    const selectedTicket = useSelector((state) => state.selectedTicketReducer);

    const dispatch = useDispatch();

    const goToAddTicketForm = () => {
        console.log('hhhhhh');
        dispatch(removeSelectedTicket());
    }

    /* let displayed;

    if(Object.keys(selectedTicket).length ==== 0){
        displayed = <AddTicket />;
    }else {
        displayed = <TicketDetails />;
    } */


    return (
        <>
            <Header />
            <div className="home-container">
                <div className="left-container">
                    <TicketList />
                </div>
                <div className="right-container">
                    {(Object.keys(selectedTicket).length === 0) ? null :
                        <>
                            <Button className="success" type="button" onClick={() => goToAddTicketForm()}>
                                Add Ticket
                            </Button>
                        </>
                    }
                    {(Object.keys(selectedTicket).length === 0) ? <AddTicket /> : <TicketDetails />}
                </div>
            </div>
        </>

    )
};

export default HomeContainer;