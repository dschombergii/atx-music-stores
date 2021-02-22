import React from 'react'
import { Switch, Route } from 'react-router-dom'

import Businesses from './components/app/Businesses'
import AddBusiness from './components/app/AddBusiness'
import BusinessDetails from './components/app/BusinessDetails'
import Signup from './components/authentication/Signup';
import Login from './components/authentication/Login'
import ForgotPassword from './components/authentication/ForgotPassword'
import PrivateRoute from './components/authentication/PrivateRoute'

function Router() {
    return (
        <Switch>
            {/* App */}
            <Route exact path="/" component={Businesses} />
            <Route path="/businesses" component={Businesses} />
            <Route path='/details/:id' component={BusinessDetails} />
            <PrivateRoute path="/add-business" component={AddBusiness} />

            {/* Auth */}
            <Route path='/signup' component={Signup} />
            <Route path='/login' component={Login} />
            <Route path='/forgot-password' component={ForgotPassword} />
        </Switch>
    )
}

export default Router