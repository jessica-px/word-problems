import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components'

import { NavBar } from 'generalUI/Navbar';
import { HomePage } from 'pages/homePage/HomePage.tsx';
import { YearsPage } from 'pages/yearsPage/YearsPage.tsx';


// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

const App = () => (
  <React.Fragment>
    <GlobalStyle />
    <Router>
      <PageContainer>
        <NavBar />
        <MainContent>
          <Switch>
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/years">
              <YearsPage />
            </Route>
          </Switch>
        </MainContent>
      </PageContainer>
    </Router>
  </React.Fragment>
)

// -------------------------------------------------------------------------- //
//                              Styled Components                             //
// -------------------------------------------------------------------------- //

const GlobalStyle = createGlobalStyle`
  html, body, body > #app {
    font-family: "Roboto", sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const MainContent = styled.div`
  background-color: #f2f7f5;
  width: 100%;
`

ReactDOM.render(<App />, document.getElementById('app'));