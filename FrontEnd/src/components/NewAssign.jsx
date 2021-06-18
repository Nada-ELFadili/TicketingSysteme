import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

import AdminNavBar from './layout/AdminNavBar'

// import { Link } from 'react-router-dom';
const NewAssign = (props) => {
    //Get ticket id from params
    const { idTicket, idUser } = useParams();

    //initiate state values of Ticket
    const initialState = {idTicket: idTicket,
                            idUser: idUser, 
                            idTech: '', 
                            moreInfo: ''
                        };

    //Create a new state 
    const [assign, setAssign] = useState(initialState);
    
    //Create Error state
    const [ errorMessage, setErrorMessage ] = useState('');

    //Array of existing users with role of technicien
    const [ tech, setTech ] = useState([]);

    //Call getTecks one time in the component display
    useEffect( () => {
        getTecks();
    }, []);

    //Get all technicien data,will be used to fill a select input in jsx code(return)
    const getTecks = () => {
        axios.get('http://localhost:5000/api/users/tech' ,{ withCredentials: true })
        .then(res => {
            setTech(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    //Handle inputs changes
    const onChange = (e) =>{
        setAssign({
            ...assign,
            [e.target.name] : e.target.value
        });
    }
      //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Call api endpoint
            const id = await axios.post('http://localhost:5000/api/assign/new', assign, { withCredentials: true });
            
            //Redirect to list of all users
            if (id) props.history.push('/listtickets');
        } catch (error) {
            //Set error message
            setErrorMessage(error.response.data.message);
        }
    }

    return <div>
        <AdminNavBar />
        <section className="testimonial py-5" id="testimonial">
                <div className="container">
                    <div className="row ">
                        
                            <div className=" ">
                                <div className="card-body">
                                
                                    <h2 className="p-3 mb-2 bg-warning text-dark">SGT</h2>
                                    <p>Add new ticket</p>
                                </div>
                            </div>
                        
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Assign a ticket</h4>
                            <form id="addNewUser" name="addNewUser" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <select id="idTech" name="idTech" className="form-control"  onChange={onChange}>
                                            <option value="">--Please choose a technicien--</option>
                                            {tech.map(tc =>{
                                                return <option value={tc._id}>{tc.fname + ' ' + tc.lname} </option>
                                            })}
                                        </select>
                                    </div>
                                    <div className="form-group col-md-6">
                                    <textarea id="moreInfo" name="moreInfo" placeholder="More informations" className="form-control" type="text" onChange={onChange}  rows="5" cols="33">
                                    </textarea>
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
 
export default NewAssign;