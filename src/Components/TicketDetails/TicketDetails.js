import React, { useState } from "react";
import './TicketDetails.css';
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { selectedTicket, assignTicket, removeSelectedTicket, closeTicket } from "../../redux/actions/ticketActions";
import { Button } from "react-bootstrap";


const PATCH_TICKET_URL = `http://localhost:8000/tickets_app/v1/tickets/`;
const USER_INFO_URL = `http://localhost:8000/tickets_app/v1/users/`;
const DOWNLOAD_FILE_URL = `http://localhost:8000/tickets_app/v1/file/download/`;

const TicketDetails = () => {


    const selectedTicket = useSelector((state) => state.selectedTicketReducer);
    const ticketsState = useSelector((state) => state.ticketsReducer);
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [createdByUser, setCreatedByUser] = useState();
    const [treatedByUser, setTreatedByUser] = useState();
    const [file, setFile] = useState('');
    const dispatch = useDispatch();

   

    /* handle the PATCH request to th api */
    const handleTreatment = () => {
        console.log("selectedTicket.id: ", selectedTicket.id);
        fetchAssignReaquest(selectedTicket.id);
    }

    /* send PATCH request to the api */
    const fetchAssignReaquest = async (id) => {
        const payload = {
            status: 2,
            assigned_to: loggedUser.id,
            assigned_on: new Date()
        }
        const response = await axios.patch(PATCH_TICKET_URL + id + "/", payload)
            .catch((error) => { console.log(error) })
        const updatedTicket = { ...selectedTicket };
        updatedTicket.status = payload.status;
        updatedTicket.assigned_to = payload.assigned_to;
        updatedTicket.assigned_on = payload.assigned_on;
        dispatch(assignTicket(updatedTicket));
    }

    const handleClose = (event) => {
        event.preventDefault();
        fetchCloseRequest(selectedTicket.id);
    }

    const fetchCloseRequest = async (id) => {
        let formData = new FormData();
        formData.append("feedback", file);
        formData.append("status", 3);
        console.log("formDatat: ", formData);
        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        };
        const payload = {
            feedback: file,
            status: 3
        }
        console.log("payload: ", payload);
        const response = await axios.patch(PATCH_TICKET_URL + id + "/", formData, axiosConfig)
            .catch((error) => { console.log(error) })
        const updatedTicket = { ...selectedTicket };
        //updatedTicket.feedback = formData.feedback;
        updatedTicket.status = payload.status;
        dispatch(closeTicket(updatedTicket));
    }

    const handleDownload = () => {
        console.log("selectedTicket: ", selectedTicket.feedback);
        fetchDownloadFile();
    }

    const fetchDownloadFile = async () => {
        console.log("extension: ",getFileExtension(selectedTicket.feedback));;
        const filePath = selectedTicket.feedback;
        const response = await axios.get(DOWNLOAD_FILE_URL,
            {params: {"file_path": filePath},
            responseType: 'blob'})
            .catch((error) => {console.log(error);})
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedTicket.title+"&"+createdByUser.username+"&"+treatedByUser.username+getFileExtension(selectedTicket.feedback));
        document.body.appendChild(link);
        link.click();

    }

    const getFileExtension = (filePath) => {
        let endFilePath = filePath.slice(-7);
        const startIndex = endFilePath.indexOf(".");
        if (startIndex !== -1) {
            const result = endFilePath.substring(startIndex);
            console.log(result); 
            return result;
        }
    }

    useEffect(() => {
        /** get the information of the creater user */
        const fetchCreatedByUser = async (id) => {
            const response = await axios.get(USER_INFO_URL + id)
                .catch((error) => { console.log(error) });
                setCreatedByUser(response.data);
        };
        fetchCreatedByUser(selectedTicket.created_by);

        const fetchTreatedByUser = async (id) => {
            const response = await axios.get(USER_INFO_URL + id)
                .catch((error) => { console.log(error) });
                setTreatedByUser(response.data);
        };
        fetchTreatedByUser(selectedTicket.assigned_to);

    }, [selectedTicket]);

    return (
        <div>
            <h2>Here is Ticket Details</h2>
            <p>ID: {selectedTicket.id}</p>
            <p>Title: {selectedTicket.title}</p>
            <p>Deadline: {selectedTicket.deadline}</p>
            <p>Description: {selectedTicket.description}</p>
            <p>Created By: {createdByUser ? createdByUser.username : null}</p>
            {(selectedTicket.status === 3) ?
              <p>Treated By: {treatedByUser ? treatedByUser.username : null}</p>:
            null}
            {(selectedTicket.status === 2) ?
              <p>Being Treated By: {treatedByUser ? treatedByUser.username : null}</p>:
            null}
            {(selectedTicket.status === 3 && selectedTicket.feedback) ?
              <Button variant="outline-secondary" onClick={handleDownload}>Download</Button>:
            null}
            {/* {(selectedTicket.status === 3 && selectedTicket.feedback && loggedUser.groups.includes(2)) ?
              <a  href={selectedTicket.feedback}>File</a>:
            null} */}

            {(selectedTicket.status === 2) ?
                <div className="upload-file-container">
                    <Form onSubmit={handleClose} encType="multipart/form-data">
                        <Form.Group controlId="formFile" className="mb-3">
                            <Form.Label>Upload descriptif file</Form.Label>
                            <Form.Control type="file"

                                onChange={(event) => {
                                    setFile(event.target.files[0])
                                }} />
                        </Form.Group>
                        {(selectedTicket.status === 2) ?
                            <Button variant="success" type="submit">
                                Close Ticket
                            </Button> :
                            null
                        }
                    </Form>
                </div> :
                null
            }
            {(Object.keys(selectedTicket).length === 0) ? null :
                <>
                    {/* <Button className="add-ticket-nav-button" type="button" onClick={() => goToAddTicketForm()}>
                                Go To Add Ticket
                            </Button> */}

                    {(selectedTicket.status === 1) ?
                        <Button variant="warning" type="button" onClick={() => handleTreatment()}>
                            Treat Ticket
                        </Button> :
                        null
                    }

                </>
            }
        </div>
    )

}

export default TicketDetails;