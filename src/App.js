import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Link ,
    Switch,
    Route
  } from "react-router-dom";
import Form from './page/form/Form';



class App extends Component {

    render() {
        return(
          <>
            <Router>
              <nav>
                <ul>
                  <li><Link to='/form'>Form</Link></li>
                  <li><Link to='/todo-list'>Todo-list</Link></li>
                </ul>
                <Switch>
                    <Route  exact path="/form" component={Form}>
                    </Route>
                </Switch>
              </nav>
            </Router>
          </>
        )
    }
}

export default App;
