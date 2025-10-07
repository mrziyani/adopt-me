import { BrowserRouter, Link, Routes, Route } from "react-router-dom";
import SearchParams from "./SearchParams";
import Details from "./Details";

function App() {
  return (
    <BrowserRouter>
      <div className="container">
        <header>
          <Link to="/">
            <h1>Adopt Me!</h1>
          </Link>
          <p>Find your perfect pet companion</p>
        </header>

        <Routes>
          <Route path="/" element={<SearchParams />} />
          <Route path="/details/:id" element={<Details />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
