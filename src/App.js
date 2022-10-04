import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/Container/Container";
import Categories from "./Pages/PLP/PLP";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Routes,
} from "react-router-dom";
import PDP from "./Pages/PDP/PDP";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { Component } from "react";
import PLP from "./Pages/PLP/PLP";

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
                {/* <Route exact path={"/"}>
                  <Categories />
                </Route> */}
                <Route exact path={"/PDP/:productId"}>
                  {" "}
                  <PDP />
                </Route>
                <Route exact path={"/"}>
                  {" "}
                  <PLP />
                </Route>
              </Switch>
            </Router>
          </Container>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
