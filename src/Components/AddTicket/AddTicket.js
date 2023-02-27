import React, { useState } from "react";
import "./AddTicket.css";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch } from "react-redux";
import { addTicket } from "../../redux/actions/ticketActions";
import axios from "axios";

const ADD_URL = `http://localhost:8000/tickets_app/v1/tickets/`;

const AddTicket = () => {

  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const dispatch = useDispatch();

    const hundleSubmit = (event) => {
        
        event.preventDefault();
        console.log(title);
        const newTicket = {title, 
                            description, 
                            deadline, 
                            created_by: user.id, 
                            status: 1}

        console.log(newTicket);
        
        fetchAddTicket(newTicket);

        resetForm();

    }

    const fetchAddTicket = async (newTicket) => {
        const response = await axios.post(ADD_URL, newTicket)
        .catch((error) => {
            console.log(error)
        });
        dispatch(addTicket(response.data));
    };

    const resetForm = () => {
        setTitle('');
        setDescription('');
        setDeadline('');
    }


  return (
    <div className="add-form-container">
        <h2>Add New Ticket</h2>
      <Form onSubmit={hundleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" 
                        placeholder="Enter title"  
                        id="title" 
                        value={title}
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}/>
        </Form.Group>

        <Form.Group className="mb-3" >
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" 
                        id="description"
                        value={description}
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Deadline</Form.Label>
          <Form.Control type="datetime-local" 
                        id="deadline"
                        value={deadline}
                        onChange={(event) => {
                            setDeadline(event.target.value)
                        }} />
        </Form.Group>
        
        <Button className="add-ticket-button" variant="primary" type="submit">
          Submit
        </Button>
        <Button variant="link" type="button" onClick={() => resetForm()}>
           Reset             
        </Button>
      </Form>
    </div>
  );
};

export default AddTicket;
