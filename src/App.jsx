import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Store from "./screens/store/store";
import Labs from "./screens/labs/labs";
import Chemicals from "./screens/chemicals/chemicals";
import Login from "./screens/login/login";
import Register from "./screens/register/register";
import Lab from "./screens/lab/lab";
import Forbidden from "./screens/400/403";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/forbidden" element={<Forbidden />} />

        <Route path="/store" element={<Store />} />
        <Route path="/labs" element={<Labs />} />
        <Route path="/chemicals" element={<Chemicals />} />
        <Route path="/lab/:id" element={<Lab />} />
      </Routes>
    </Router>
  )
}

export default App
