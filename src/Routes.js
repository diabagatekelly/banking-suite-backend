import React from "react";
import { Switch, Redirect, Route } from "react-router-dom";
import HomeUnauth from './HomeUnauth';
import RegisterLoginForm from './RegisterLoginForm';

function Routes({isLogged}) {
  return (
    <Switch>  
      <Route path="/home" exact>
        <HomeUnauth isLogged={isLogged} />
      </Route>
      <Route path="/register-login" exact>
        <RegisterLoginForm />
      </Route>
      <Redirect to="/home" exact/>  
    </Switch>
  );
}

export default Routes;