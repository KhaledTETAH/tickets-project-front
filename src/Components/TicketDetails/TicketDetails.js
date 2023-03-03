import React, { useState } from "react";
import './TicketDetails.css';
import axios from "axios";
import { useEffect } from "react";
import Form from 'react-bootstrap/Form';
import { useDispatch, useSelector } from "react-redux";
import { assignTicket, closeTicket, selectTicket } from "../../redux/actions/ticketActions";
import { Button, Col, Row } from "react-bootstrap";
import Alert from 'react-bootstrap/Alert';
import { formatDate } from "../Utils/FormatDate";
import { TICKETS_URL, USERS_URL, DOWNLOAD_FILE_URL, NOTIFICATIONS_URL } from "../Utils/ConfigApi";

const TicketDetails = () => {


    const selectedTicket = useSelector((state) => state.selectedTicketReducer.selectedTicket);
    const ticketsState = useSelector((state) => state.ticketsReducer);
    const [loggedUser, setLoggedUser] = useState(JSON.parse(localStorage.getItem("user")));
    const [createdByUser, setCreatedByUser] = useState();
    const [treatedByUser, setTreatedByUser] = useState();
    const [showTreatAlert, setShowTreatAlert] = useState(false);
    const [showCloseAlert, setShowCloseAlert] = useState(false);
    const [file, setFile] = useState('');
    const [remarks, setRemarks] = useState('');
    const dispatch = useDispatch();



    /* handle the PATCH request to th api */
    const handleTreatment = () => {
        console.log("selectedTicket.id: ", selectedTicket.id);
        fetchAssignReaquest(selectedTicket.id);
        createNotification();
        handleClick(selectedTicket.id);
        showTreatAlertTimeout();
    }

    const showTreatAlertTimeout = () => {
        setShowTreatAlert(true);
        setTimeout(() => {
            setShowTreatAlert(false)
        }, 3000)
    };


    const showCloseAlertTimeout = () => {
        setShowCloseAlert(true);
        setTimeout(() => {
            setShowCloseAlert(false)
        }, 3000)
    };


    const handleClick = async (id) => {
        const response = await axios.get(TICKETS_URL + id)
            .catch((error) => {
                console.log(error)
            });
        dispatch(selectTicket(response.data));
    }

    /* send PATCH request to the api */
    const fetchAssignReaquest = async (id) => {
        const payload = {
            status: 2,
            assigned_to: loggedUser.id,
            assigned_on: new Date()
        }
        const response = await axios.patch(TICKETS_URL + id + "/", payload)
            .catch((error) => { console.log(error) })
        const updatedTicket = { ...selectedTicket };
        updatedTicket.status = payload.status;
        updatedTicket.assigned_to = payload.assigned_to;
        updatedTicket.assigned_on = payload.assigned_on.getTime();
        dispatch(assignTicket(updatedTicket));
    }

    const handleClose = (event) => {
        event.preventDefault();
        fetchCloseRequest(selectedTicket.id);
        createNotification();
        handleClick(selectedTicket.id);
        showCloseAlertTimeout();
    }

    const fetchCloseRequest = async (id) => {
        let formData = new FormData();
        formData.append("feedback", file);
        formData.append("status", 3);
        formData.append("remarks", remarks);
        console.log("formDatat: ", formData);
        let axiosConfig = {
            headers: {
                'Content-Type': 'multpart/form-data'
            }
        };
        const payload = {
            feedback: file,
            remarks,
            status: 3
        }
        console.log("payload: ", payload);
        const response = await axios.patch(TICKETS_URL + id + "/", formData, axiosConfig)
            .catch((error) => { console.log(error) })
        const updatedTicket = { ...selectedTicket };
        //updatedTicket.feedback = formData.feedback;
        updatedTicket.status = payload.status;
        updatedTicket.remarks = payload.remarks;
        dispatch(closeTicket(updatedTicket));
    }

    const handleDownload = () => {
        console.log("selectedTicket: ", selectedTicket.feedback);
        fetchDownloadFile();
    }

    const fetchDownloadFile = async () => {
        console.log("extension: ", getFileExtension(selectedTicket.feedback));;
        const filePath = selectedTicket.feedback;
        const response = await axios.get(DOWNLOAD_FILE_URL,
            {
                params: { "file_path": filePath },
                responseType: 'blob'
            })
            .catch((error) => { console.log(error); })
        console.log(response);
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', selectedTicket.title + "&" + createdByUser.username + "&" + treatedByUser.username + getFileExtension(selectedTicket.feedback));
        document.body.appendChild(link);
        link.click();

    };

    const getFileExtension = (filePath) => {
        let endFilePath = filePath.slice(-7);
        const startIndex = endFilePath.indexOf(".");
        if (startIndex !== -1) {
            const result = endFilePath.substring(startIndex);
            console.log(result);
            return result;
        }
    };

    const createNotification = () => {
        const payload = {
            time: new Date(),
            read: false,
            ticket_status: selectedTicket.status + 1,
            by_ticket: selectedTicket.id,
            notified_user: createdByUser.id
        }
        fetchCreatenotification(payload);
    };

    const fetchCreatenotification = async (payload) => {
        console.log("payload: ", payload);
        const response = await axios.post(NOTIFICATIONS_URL, payload)
            .catch((error) => { console.log(error) })
        console.log("Notification: ", response.data);
    };

    useEffect(() => {
        /** get the information of the creater user */
        const fetchCreatedByUser = async (id) => {
            const response = await axios.get(USERS_URL + id)
                .catch((error) => { console.log(error) });
            setCreatedByUser(response.data);
        };
        fetchCreatedByUser(selectedTicket.created_by);

        const fetchTreatedByUser = async (id) => {
            const response = await axios.get(USERS_URL + id)
                .catch((error) => { console.log(error) });
            setTreatedByUser(response.data);
        };
        if (selectedTicket.status !== 1) {
            fetchTreatedByUser(selectedTicket.assigned_to);
        }


    }, [selectedTicket]);

    return (
        <div>
            {showTreatAlert && (
                <Alert key="warning" variant="warning" onClose={() => setShowTreatAlert(false)} dismissible>
                    You start treating this ticket
                </Alert>
            )}
            {showCloseAlert && (
                <Alert key="success" variant="success" onClose={() => setShowCloseAlert(false)} dismissible>
                    You closed this ticket
                </Alert>
            )}
            <div className="details-root-container">
                <div className="status-title-container">
                    {(selectedTicket.status === 1) ? <div className="status-created"></div> : null}
                    {(selectedTicket.status === 2) ? <div className="status-assigned"></div> : null}
                    {(selectedTicket.status === 3) ? <div className="status-closed"></div> : null}
                    <div className="title-container">
                        <h2>{selectedTicket.title}</h2>
                    </div>
                </div>
                <Row>
                    <Col>
                        <div className="id-container">
                            <div className="label-container">ID:</div>
                            <div className="value-container">{selectedTicket.id}</div>
                        </div>
                    </Col>
                    <Col>
                        <div className="id-container">
                            <div className="label-container">Created By:</div>
                            <div className="value-container">{createdByUser ? createdByUser.username : null}</div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="id-container">
                            <div className="label-container">Deadline:</div>
                            <div className="value-container">{formatDate(selectedTicket.deadline)}</div>
                        </div>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <div className="id-container">
                            <div className="label-container">Description:</div>
                            <div className="value-container">{selectedTicket.description}</div>
                        </div>
                    </Col>
                </Row>

                {(selectedTicket.status === 3) ?
                    <div className="id-container">
                        <div className="label-container">Treated By:</div>
                        <div className="value-container">{treatedByUser ? treatedByUser.username : null}</div>
                    </div>
                    :
                    null}
                {(selectedTicket.status === 2) ?
                    <div className="id-container">
                        <div className="label-container">Being Treated By:</div>
                        <div className="value-container">{treatedByUser ? treatedByUser.username : null}</div>
                    </div>
                    :
                    null}

                {(selectedTicket.status === 3 ) ?
                    <>
                        <div className="id-container">
                            <div className="label-container">Remarks:</div>
                            <div className="value-container">{selectedTicket.remarks}</div>
                        </div>
                    </> :
                    null}
                {(selectedTicket.status === 3 && selectedTicket.feedback) ?
                    <>
                        <Button variant="outline-secondary" type="button" onClick={handleDownload}>Download File</Button>
                    </> :
                    null}

                {(selectedTicket.status === 2) && (loggedUser.groups.includes(2)) ?
                    <div className="upload-file-container">
                        <Form onSubmit={handleClose} encType="multipart/form-data">
                            <Form.Group className="mb-3" >
                                <Form.Label>
                                    <div className="label-container">Description:</div>
                                </Form.Label>
                                <Form.Control as="textarea"
                                    id="description"
                                    value={remarks}
                                    onChange={(event) => {
                                        setRemarks(event.target.value)
                                    }} required />
                            </Form.Group>
                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>
                                    <div className="label-container">Upload descriptif file:</div>
                                </Form.Label>
                                <Form.Control type="file"

                                    onChange={(event) => {
                                        setFile(event.target.files[0])
                                    }} />
                            </Form.Group>
                            <Button variant="success" type="submit">
                                Close Ticket
                            </Button>
                        </Form>
                    </div> :
                    null
                }
                {(Object.keys(selectedTicket).length === 0) ? null :
                    <>
                        {(selectedTicket.status === 1) && (loggedUser.groups.includes(2)) ?
                            <Button variant="warning" type="button" onClick={() => handleTreatment()}>
                                Treat Ticket
                            </Button> :
                            null
                        }

                    </>
                }
            </div>
        </div>
    )

}

export default TicketDetails;