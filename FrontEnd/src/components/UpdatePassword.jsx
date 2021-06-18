import  React, {useState} from 'react';
import { useParams } from "react-router-dom";
import axios from 'axios';

const UpdatePassword =  (props) => {
    //initiate state values
    const initialState = {firstPassword : '', secondPassword : ''}

    //Get userId from parameters
    const {id}  =useParams();

    //Create a new state
    const [password, setPassword] = useState(initialState);
    const [errorMessage, setErrorMessage] = useState('');

    //Hundle inputs changes
    const onChange = (e) =>{
        setPassword({
            ...password,
            [e.target.name] : e.target.value
        });
    }

    //handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (password.firstPassword !== password.secondPassword){
            setErrorMessage('Password must be the same');
            return ;
        }
        //Call api 
        try{
            const pwd = {password: password.firstPassword };
            const res = await axios.put(`http://localhost:5000/api/users/update/${id}`, pwd,{ withCredentials: true });
            //Redirect user to login page
            if(res.data.newState === 'enabled'){
                props.history.push('/');
            }
        }catch(err){
            //Set error message
            setErrorMessage(err.response.data.message);
        }
    }

    return <div>
        <section className="testimonial py-5" id="testimonial">
                <div className="container d-flex justify-content-center">
                    <div className="row ">
                            <div className=" ">
                                <div className="card-body">
                                    <p>Update password</p>
                                    <span>Fist time login</span>
                                </div>
                            </div>
                        
                        <div className="col-md-8 py-5 border">
                            <h4 className="pb-4">Please fill with your new password</h4>
                            <form id="login" name="login" onSubmit={handleSubmit}>
                                <div className="form-row">
                                    <div className="form-group col-md-12">
                                        <input id="firstPassword" name="firstPassword" placeholder="Password" className="form-control" type="password" onChange={onChange} />
                                    </div>
                                    <div className="form-group col-md-12">
                                        <input id="secondPassword" name="secondPassword" placeholder="Password" className="form-control" type="password" onChange={onChange} />
                                    </div>
                                </div>
                                {errorMessage && <p className="alert alert-danger" role="alert">{errorMessage}</p>}
                                <div className="form-row">
                                    <input type="submit" className="btn btn-danger" value="Update"/>
                                </div>
                            </form>
                        </div>
                    </div>    
                </div>
        </section>
    </div>
}

export default UpdatePassword;