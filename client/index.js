import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { HomePage } from 'pages/homePage/HomePage.tsx';
import { YearsPage } from 'pages/yearsPage/YearsPage.tsx';


const App = () => (
  <Router>
    <Switch>
      <Route exact path="/">
        <HomePage />
      </Route>
      <Route path="/years">
        <YearsPage />
      </Route>
    </Switch>
  </Router>
)

ReactDOM.render(<App />, document.getElementById('app'));