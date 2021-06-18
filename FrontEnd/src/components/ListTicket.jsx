import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

//Get connected user data from the context
import { AuthContext } from '../contexts/AuthContext';

//Get navbars
import UserNavBar from './layout/UserNavBar';
import AdminNavBar from './layout/AdminNavBar';

const ListTicket = () => {
    const { type, userId } = useContext(AuthContext);
    const [ tickets, setTickets ] = useState([]);
        
    useEffect( () => {
        getTickets();
    }, []);

    const getTickets = () => {
        //Get only tickets of connected user
        let URI = 'http://localhost:5000/api/tickets/' + userId ;

        if ( type === 'admin' ) {
            //Connected user is a admin
            URI = 'http://localhost:5000/api/tickets/all';
        }

        axios.get(URI,{ withCredentials: true })
            .then(res => {
                setTickets(res.data);
            }).catch(err => {
                console.log(err);
            });
    }

    //Delete a ticket
    const handleDelete = (ticketId) => {
        axios.delete(`http://localhost:5000/api/tickets/delete/${ticketId}` ,{ withCredentials: true })
            .then(res => {
                getTickets();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (   
        <>
        { type === 'admin' ? <AdminNavBar /> : <UserNavBar /> }
        <div className="container">
            <div className="row">
                {tickets.map((ticket) => {
                    return  <div className="card col-sm-3 ml-4 mr-4" >
                                <div className="card-body">
                                    <h5 className="card-title">{ticket.title}</h5>
                                    <h6 className="card-subtitle mb-2 text-muted">{ticket.type}</h6>
                                    <p className="card-text">{ticket.desc}</p>
                                    <p className="card-text warning"> {ticket.urgence} </p>
                                    <p className="card-text">{ticket.state}</p>
                                    <p className="card-text">{ticket.date}</p>
                                    <button className="card-link" onClick={() => handleDelete(ticket._id)}>Delete </button> <spacing>
                                    <Link to={'/newassign/' + ticket._id + '/' + ticket.userId} ><button className="card-link">Assing</button></Link></spacing>
                                </div>
                            </div>
                })}
            </div>
        </div>
        </>
    );
}
 
export default ListTicket;