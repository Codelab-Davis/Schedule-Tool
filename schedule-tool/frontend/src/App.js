import React from 'react';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route} from "react-router-dom";
import './App.css';



import Navbar from "./components/navbar.component.js";

import RouterPage from "./components/RouterPage.js";

const client = new ApolloClient({
  uri:'http://localhost:5000/graphql',
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
          <Navbar />
          <br />
          <RouterPage/>
      </Router>
    </ApolloProvider>
  );
}

export default App;
