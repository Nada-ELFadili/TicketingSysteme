import React, { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../contexts/AuthContext';

import UserNavBar from './layout/UserNavBar'

const NewTicket = (props) => {
    //Get userId from authContext
    const { userId } = useContext(AuthContext);
    //initiate state values of Ticket
    const initialState = {title: '',
                            type: '', 
                            urgence: '', 
                            description: '',
                            userId: ''
                        };
    //Create a new state 
    const [ticket, setTicket] = useState(initialState);
    
    //Create Error state
    const [errorMessage, setErrorMessage] = useState('');

    //Hundle inputs changes
    const onChange = (e) =>{
        setTicket({
            ...ticket,
            [e.target.name] : e.target.value
        });
    }
    
    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Call api endpoint
            ticket.userId = userId;
            const id = await axios.post('http://localhost:5000/api/tickets/new', ticket, { withCredentials: true });
            
            //Redirect to list of all users
            if (id) props.history.push('/listtickets');
        } catch (error) {
            //Set error message
            setErrorMessage(error.response.data.message);
        }
    }
    return <div>
        <UserNavBar />
        <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row ">
                            <div className=" ">
                                <div className="card-body">
                                    <p>Add new ticket</p>
                                </div>
                            </div>
                        
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Please add ticket</h4>
                            <form id="addNewUser" name="addNewUser" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <input id="title" name="title" placeholder="Title" className="form-control" type="text" onChange={onChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="type" name="type" placeholder="Type" className="form-control" type="text" onChange={onChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input type="text" name="urgence" className="form-control" id="urgence"  placeholder="Urgence" onChange={onChange} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input id="text" name="description" placeholder="Description" className="form-control" type="text" onChange={onChange} />
                                    </div>  
                                </div>
                                
                                {errorMessage && <p className="alert alert-danger" role="alert">{errorMessage}</p>}
                                <div className="form-row">
                                    <input type="submit" className="btn btn-danger" value="Submit"/>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
        </section>
</div>
}
 
export default NewTicket;