import "./App.css";
import Navbar from "./Components/Navbar/Navbar";
import Container from "./Components/Container/Container";
import Categories from "./Pages/Categories/Categories";
import {
  BrowserRouter as Router,
  Routes,
  Switch,
  Route,
} from "react-router-dom";
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
              <Routes>
                <Route path={"/"} element={<Categories />} />
                <Route path={"/PDP"} element={<PDP />} />
              </Routes>
            </Router>
          </Container>
        </ApolloProvider>
      </div>
    );
  }
}

export default App;
