import { ticketActionTypes } from "../constants/ticketAction-types";

export const setTickets = (tickets) => {
    return {
        type: ticketActionTypes.SET_TICKETS,
        payload: tickets
    };
};

export const selectTicket = (ticket) => {
    return {
        type: ticketActionTypes.SELECTED_TICKET,
        payload: ticket,
    }
};

export const filteringTickets = (filteringBool) => {
    return {
        type: ticketActionTypes.FILTERING_TICKETS,
        payload: filteringBool
    }
};

export const filterTicketsByStatus = (status) => {
    return {
        type: ticketActionTypes.FILTER_TICKETS_BY_STATUS,
        payload: status,
    }
};

export const assignTicket = (updatedTicket) => {
    return {
        type: ticketActionTypes.ASSIGN_TICKET,
        payload: updatedTicket,
    }
};

export const closeTicket = (updatedTicket) => {
    return {
        type: ticketActionTypes.CLOSE_TICKET,
        payload: updatedTicket,
    }
}

export const removeSelectedTicket = () => {
    return {
        type: ticketActionTypes.REMOVE_SELECTED_TICKET
    }
};

/* export const treatSelectedTicket = () => {
    return {
        type: ticketActionTypes.TREAT_SELECTED_TICKET
    }
}; */

/* export const closeSelectedTicket = () => {
    return {
        type: ticketActionTypes.CLOSE_SELECTED_TICKET
    }
}; */

export const addTicket = (ticket) => {
    return {
        type: ticketActionTypes.ADD_TICKET,
        payload: ticket,
    }
};

export const getUserNotifications = (notifications) => {
    return {
        type: ticketActionTypes.GET_USER_NOTIFICATIONS,
        payload: notifications,
    }
};

export const addNotification = (notification) => {
    return {
        type: ticketActionTypes.ADD_NOTIFICATION,
        payload: notification,
    }
};

export const readNotification = (readNotification) => {
    return {
        type: ticketActionTypes.READ_NOTIFICATION,
        payload: readNotification,
    }
};

export const getNotificationTickets = (notificationTickets) => {
    return {
        type: ticketActionTypes.GET_NOTIFICATION_TICKETS,
        payload: notificationTickets,
    }
}