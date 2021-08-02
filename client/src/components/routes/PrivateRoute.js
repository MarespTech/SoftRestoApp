import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router';
import AuthContext from '../../context/auth/authContext';

const PrivateRoute = ({ component: Component, ...props}) => { 
    const authContext = useContext(AuthContext);
    const { authenticate, loading, authenticateUser } = authContext;

    useEffect(() => {
        authenticateUser();
    }, []);
    
    return ( 
        <Route { ...props } render = { props => !authenticate && !loading 
                ? ( <Redirect to="/"/> )
                : ( <Component {...props}/> )
            }
        />
    );
}
 
export default PrivateRoute;