import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/Container/Container";
import Categories from "./Pages/Categories/Categories";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PDP from "./Pages/PDP/PDP";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { Component } from "react";

const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

class App extends Component {
  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <Container>
            <Router>
              <Navbar />
              <Switch>
                <Route path={"/"} render={() => <Categories />} />
                <Route path={"/"} element={<PDP />} />
              </Switch>
            </Router>
          </Container>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
