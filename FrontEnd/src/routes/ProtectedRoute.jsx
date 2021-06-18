import React, { useContext } from 'react';
import {Route, Redirect} from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = ({comp:Component, ...rest}) => {
    const { type, isAuth } = useContext(AuthContext);

    //Array defining components useable by type(Role) of user 
    const authorizations = [
        {
            type: 'admin',
            components: ['AddUser', 'Users', 'UpdatePassword', 'NewTicket','ListTicket', 'NewAssign']
        },
        {
            type: 'user',
            components: ['UpdatePassword', 'NewTicket', 'ListTicket']
        },
        {
            type: 'tech',
            components: ['UpdatePassword', 'NewTicket','ListTicket']
        }
    ];

    return (
        <div>
            <Route 
                {...rest}
                render={props => {
                    if(isAuth){
                        let typeExist = authorizations.filter(auth => auth.type === type);
                        if(typeExist.length>0){
                            let authExist = typeExist[0].components.filter(com => com === Component.name);
                            if(authExist.length>0){
                                return <Component {...props}/>
                            }else{
                                return <Redirect to='/'></Redirect>
                            }
                        }else{
                            return <Redirect to='/'></Redirect>
                        }
                    }else{
                        return <Redirect to='/'></Redirect>
                    }
                }
                }
            >

            </Route>
        </div>
    )
}

export default ProtectedRoute;

