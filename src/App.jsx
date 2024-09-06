import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import Store from "./screens/store/store";
import Labs from "./screens/labs/labs";

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/store" element={<Store />} />
        <Route path="/labs" element={<Labs />} />
      </Routes>
    </Router>
  )
}

export default App
