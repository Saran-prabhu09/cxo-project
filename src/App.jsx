import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.jsx";
import Home from "./pages/Home.jsx";
import MembershipForm from "./pages/MembershipForm.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/membership" element={<MembershipForm />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
