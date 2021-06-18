import React, { Route, Switch } from 'react-router-dom';
import AuthContextProvider from '../contexts/AuthContext';
//Import components
import AddUser from '../components/AddUser';
import Users from '../components/Users';
import Login from '../components/Login';
import UpdatePassword from '../components/UpdatePassword';
import NewTicket from '../components/NewTicket';
import ListTicket from '../components/ListTicket';
import NewAssign from '../components/NewAssign';
//Getting ProtectedRoute 
import ProtectedRoute from './ProtectedRoute';

const Routes = () => {
    return ( 
        <Switch>
            {/*Include context provider to allow all components in app.js to use the context*/ }
                <AuthContextProvider>
                    {/*Normal routes doesn't need context data*/}
                    <Route exact path='/' component={Login}></Route>
                    <Route exact path='/updatepassword/:id' component={UpdatePassword}></Route>

                    {/*Protected routes*/}
                    <ProtectedRoute exact path='/newuser' comp={AddUser} ></ProtectedRoute>
                    <ProtectedRoute exact path='/users' comp={Users}></ProtectedRoute>
                    <ProtectedRoute exact path='/newticket' comp={NewTicket} ></ProtectedRoute>
                    <ProtectedRoute exact path='/listtickets' comp={ListTicket}></ProtectedRoute>
                    <ProtectedRoute exact path='/newassign/:idTicket/:idUser' comp={NewAssign}></ProtectedRoute>
                </AuthContextProvider>
        </Switch>
    );
}
 
export default Routes;