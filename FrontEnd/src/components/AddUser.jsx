import  React, {useState} from 'react';
import axios from 'axios';

//the admin navbar
import AdminNavBar from './layout/AdminNavBar';

const AddUser = (props) => {
    //init state values
    const initialState = {fname: '',lname: '', username: '', password: '',email: '', type: ''};

    //Create a new state
    const [user, setUser] = useState(initialState);

    //Create Error state
    const [errorMessage, setErrorMessage] = useState('');

    //Handle inputs changes
    const onChange = (e) =>{
        setUser({
            ...user,
            [e.target.name] : e.target.value
        });
    }

    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            //Call api endpoint
            const id = await axios.post('http://localhost:5000/api/users/new', user, { withCredentials: true });
            
            //Redirect to list of all users
            if (id) props.history.push('/users');
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
                        <div className="col-md-4 py-5 bg-primary text-white text-center ">
                            <div className=" ">
                                <div className="card-body">
                                    <p>Add new user</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Please fill with details of a user</h4>
                            <form id="addNewUser" name="addNewUser" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                    <input id="fname" name="fname" placeholder="First Name" className="form-control" type="text" onChange={onChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                        <input id="lname" name="lname" placeholder="Last Name" className="form-control" type="text" onChange={onChange} />
                                    </div>
                                </div>
                                <div className="form-row">
                                    <div className="form-group col-md-6">
                                        <input type="email" className="form-control" id="email" name="email" placeholder="Email" onChange={onChange} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input id="username" name="username" placeholder="Username" className="form-control" type="text" onChange={onChange} />
                                    </div>
                                    <div class="form-group col-md-6">
                                        <input id="password" name="password" placeholder="Password" className="form-control" type="password" onChange={onChange} />
                                    </div>
                                    <div className="form-group col-md-6">
                                            <select id="type" name="type" className="form-control" onChange={onChange}>
                                                <option defaultValue>Choose a type...</option>
                                                <option> user</option>
                                                <option> admin</option>
                                                <option> tech</option>
                                            </select>
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

export default AddUser;