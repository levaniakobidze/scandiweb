import "./App.css";
import Container from "./Components/Container/Container";
import Navbar from "./Components/Navbar/Navbar";
import Categories from "./Pages/Categories/Categories";

function App() {
  return (
    <div>
      <Container>
        <Navbar />
        <Categories />
      </Container>
    </div>
  );
}

export default App;
