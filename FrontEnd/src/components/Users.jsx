import  React, { useState, useEffect } from 'react';
import axios from 'axios';

import AdminNavBar from './layout/AdminNavBar';

const Users = () => {
    const [ users, setUsers ] = useState([]);
    
    useEffect( () => {
        getUsers();
    }, []);

    const getUsers = () => {
        axios.get('http://localhost:5000/api/users/all',{ withCredentials: true })
        .then(res => {
            setUsers(res.data);
        }).catch(err => {
            console.log(err);
        });
    }

    //Delete a user
    
    const handleDelete = (userId) => {
        axios.delete(`http://localhost:5000/api/users/delete/${userId}` ,{ withCredentials: true })
            .then(res => {
                getUsers();
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <>
            <AdminNavBar />
            <div className="container">
                <table className="table">
                    <thead className="bg-primary">
                        <tr>
                        <th scope="col">#</th>
                        <th scope="col">First name</th>
                        <th scope="col">Last name</th>
                        <th scope="col">Username</th>
                        <th scope="col">Type</th>
                        <th scope="col">Email</th>
                        <th scope="col">State</th>
                        <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map( (user,index) =>{
                            return <tr key={index} >
                                    <th scope="row">1</th>
                                    <td>{user.fname}</td>
                                    <td>{user.lname}</td>
                                    <td>{user.username}</td>
                                    <td>{user.type}</td>
                                    <td>{user.email}</td>
                                    <td>{user.state}</td>
                                    <td><button className="btn btn-danger" onClick={()=>handleDelete(user._id)}>s</button></td>
                                 </tr>
                        })}
                        
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default Users;
