import React, { Component } from 'react';
// import { render } from 'react-dom';
// import { BrowserRouter } from 'react-router-dom';

import {
    BrowserRouter as Router,
    Link
  } from "react-router-dom"



class App extends Component {

    render() {
        return(
            <>
            <Router>
                <nav>
            <ul>
              {/* <li><Link to='/'>Home</Link></li> */}
              <li><Link to='/form'>Form</Link></li>
              <li><Link to='/todo-list'>Todo-list</Link></li>
            </ul>
          </nav>
            </Router>
            
            </>

        )
    }
}

export default App;
