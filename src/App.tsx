import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";

function App() {
  return (
    <div className="w-full h-full">
      <Router>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/login" element={<LoginPage />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<ListPage />} />
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
