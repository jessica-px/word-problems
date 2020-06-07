import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <p>Hello World. This is the main page.</p>
      </Route>
      <Route path="/page2">
        <p>Hello World???? This is NOT the main page.</p>
      </Route>
    </Switch>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('app'));