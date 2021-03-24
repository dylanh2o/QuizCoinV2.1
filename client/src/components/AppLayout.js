import React from 'react';
import Nav from './Nav';
import Home from '../views/Home';
import { Route,Switch} from "react-router-dom";

const AppLayout = () => (
  <>
    <Nav />
        <Switch>
          <Route path="/">
            <Home />
          </Route>
        </Switch>


  </>
);
export default AppLayout;
