import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import LoginPage from "./pages/LoginPage";
import NotFound from "./pages/NotFound";
import PrivateRoutes from "./utils/PrivateRoutes";
import { createContext, Dispatch, SetStateAction, useState } from "react";

export const LoginContext = createContext<{
  loginStatus: string;
  setLoginStatus: Dispatch<SetStateAction<string>>;
}>({
  loginStatus: "",
  setLoginStatus: () => {},
});

function App() {
  const [loginStatus, setLoginStatus] = useState<any>({ status: "" }); // success, failed, error

  return (
    <div className="w-full min-h-screen h-full bg-[#0b131b] text-white font-sans">
      <Router>
        <LoginContext.Provider value={{ loginStatus, setLoginStatus }}>
          <Routes>
            <Route path="*" element={<NotFound />} />
            <Route path="/login" element={<LoginPage />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/" element={<ListPage />} />
            </Route>
          </Routes>
        </LoginContext.Provider>
      </Router>
    </div>
  );
}

export default App;
