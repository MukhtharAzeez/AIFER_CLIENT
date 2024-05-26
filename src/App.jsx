import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from './layouts/Layout';
import Alert from "./components/shared/Alert";
import { useSharedStore } from "./contexts/AlertContext";
import MeterDetails from "./pages/MeterDetails";
import PricingPlan from "./pages/PricingPlan";

function App() {
    const { alert } = useSharedStore();

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/meter/:meterId" element={<MeterDetails />} />
            <Route path="/pricing" element={<PricingPlan />} />
          </Route>
        </Routes>
      </BrowserRouter>
      {alert.title && <Alert alert={alert} />}
    </>
  );
}

export default App;
