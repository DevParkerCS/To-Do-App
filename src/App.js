import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import './App.css'
import { Home } from "./pages/Home/Home";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/todo/new" element={<h1>New Todo</h1>} />
        <Route path="/todo/delete" element={<h1>Delete Todo</h1>} />
      </Routes>
    </Router>
  );
}

export default App;
