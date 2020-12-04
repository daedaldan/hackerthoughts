import React from 'react';
import { Route, Redirect } from 'react-router-dom';

import AuthService from '../../services/auth.service.js';

const PrivateRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={props => (
          AuthService.getCurrentUser()
            ? <Component {...props} />
            : <Redirect to='/login' />
        )} />
    );
};

export default PrivateRoute;


