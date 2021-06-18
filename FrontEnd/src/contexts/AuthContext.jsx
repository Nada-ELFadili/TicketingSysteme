import React, { createContext, useState } from 'react';

//createContext allow us to create un new context(data shared between many components)
export const AuthContext = createContext();

const AuthContextProvider = (props) => {
    //Informations about authenticated user
    const [auth, setAuth] = useState(
        JSON.parse(localStorage.getItem('authUser')) 
        );

    //Logout
    const logout = () => {

    }

    //Allow to modify user informations
    const updateAuth = ( {username,fname,lname,type,isAuth,state,userId} ) =>{
        setAuth({ userId: userId,
                        username: username, 
                        fname: fname, 
                        lname: lname, 
                        type: type, 
                        state: state, 
                        isAuth: isAuth 
                    });
        localStorage.setItem('authUser',JSON.stringify({username,fname,lname,type,isAuth,state,userId}))        
    }

    return (
        //Provide user informations and function to update them
        <AuthContext.Provider value={{ ...auth, updateAuth, logout}}> 
            {/*All components will be included in this area, allowing them to access the context*/}
            {props.children}
        </AuthContext.Provider>
    );
}
 
export default AuthContextProvider ;


