import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";

function App() {

  return (
      <Router>
        <div className="w-full h-full">
            <Routes>
              <Route path="/" element={<LoginPage />} />
              <Route path="/list" element={<ListPage />} />
            </Routes>
        </div>
      </Router>
  )
}

export default App
