import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import styled, { createGlobalStyle } from 'styled-components';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';

import { NavBar } from 'generalUI/Navbar';
import { HomePage } from 'pages/homePage/HomePage.tsx';
import { YearsPage } from 'pages/yearsPage/YearsPage.tsx';


// -------------------------------------------------------------------------- //
//                              Main Component                                //
// -------------------------------------------------------------------------- //

const App = () => (
  <ThemeProvider theme={theme}>
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
          <Footer/>
        </MainContent>
      </PageContainer>
    </Router>
  </ThemeProvider>
)

// -------------------------------------------------------------------------- //
//                              Styled Components                             //
// -------------------------------------------------------------------------- //

// Overrides defaults for MaterialUI components
const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#03363d',
    },
    secondary: {
      main: '#774e72'
    },
  }
})

const GlobalStyle = createGlobalStyle`
  html, body, body > #app {
    font-family: "Roboto", sans-serif;
    height: 100%;
    margin: 0;
    padding: 0;
    color: #68737d;
    h1, h2, h3 {
      color: #03363d;
    }
    a {
      text-decoration: none;
      color: #03363d;
    }
    a:visited {
      color: #03363d;
    }
  }
`

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  height: 100%;
`

const MainContent = styled.div`
  background-color: #fefefe;
  width: 100%;
  padding: 50px 60px;
  overflow: auto;
`

const FooterStyle = styled.div`
  margin-top: 40px 0;
  padding: 40px 0;
  border-top: 1px solid lightgray;
  text-align: right;
  opacity: 0.6;
`

const Footer = () => (
  <FooterStyle>
    <span>Copyright 2020</span>
  </FooterStyle>
)

ReactDOM.render(<App />, document.getElementById('app'));