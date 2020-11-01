import React from "react";
import { createGlobalStyle } from "styled-components";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import urlPageJobs from "../../../urls/urlPageJobs";
import urlPageProcesses from "../../../urls/urlPageProcesses";
import PageJobs from "../../page/PageJobs/PageJobs";
import PageProcesses from "../../page/PageProcesses/PageProcesses";

const GlobalStyle = createGlobalStyle`
 body {
   margin: 0;
   padding: 0;
   font-family: sans-serif;
 }`;

const Root = () => {
  return (
    <>
      <GlobalStyle />
      <Router>
        <Switch>
          <Switch>
            <Route exact path={urlPageJobs()} component={PageJobs} />
            <Route exact path={urlPageProcesses()} component={PageProcesses} />
            <Redirect to={urlPageProcesses()} />
          </Switch>
        </Switch>
      </Router>
    </>
  );
};

export default Root;
