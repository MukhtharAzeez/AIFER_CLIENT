import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from './layouts/Layout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/meter/:meterId" element={<Home />} />
          <Route path="/add-readings" element={<Home />} />
          <Route path="/pricing" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
