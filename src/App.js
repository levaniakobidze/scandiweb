import Navbar from "./Components/Navbar/Navbar";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PDP from "./Pages/PDP/PDP";
import { ApolloProvider } from "react-apollo";
import { InMemoryCache } from "apollo-boost";
import ApolloClient from "apollo-boost";
import { PureComponent } from "react";
import PLP from "./Pages/PLP/PLP";
import Cart from "./Pages/Cart/Cart";
import {calculate} from './redux/Slices/cartSlice'
const client = new ApolloClient({
  uri: "http://localhost:4000/",
  cache: new InMemoryCache(),
});

class App extends PureComponent {
  componentDidUpdate(prevProps, prevState) {
    if (
        prevProps.cart !== this.props.cart  ||
        prevProps.currencyIndex !== this.props.currencyIndex
    ) {
      this.props.calculate(this.props.currencyIndex);
    }
  }

  render() {
    return (
      <div>
        <ApolloProvider client={client}>
          <Router>
            <Navbar />
            <Switch>
              <Route exact path="/PDP/:productId">
                <PDP />
              </Route>
              <Route exact path="/">
                <PLP />
              </Route>
              <Route exact path="/cart">
                <Cart />
              </Route>
            </Switch>
          </Router>
        </ApolloProvider>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    cart: state.cart.cart,
    currencyIndex: state.product.currencyIndex,

  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    calculate: (index) => dispatch(calculate(index)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
