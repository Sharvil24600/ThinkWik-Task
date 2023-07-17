import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import HomePage from "./components/HomePage/HomePage";
import ViewProduct from "./components/ViewProduct";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";

const ProtectedRoute: React.FC<{
  element: React.ReactNode;
}> = ({ element }) => {
  // Fetching the isLoggedIn value from localStorage
  const userDataString = localStorage.getItem("user");
  const isLoggedIn = userDataString
    ? JSON.parse(userDataString).isLoggedIn
    : false;
  return isLoggedIn ? <>{element}</> : <Navigate to="/" replace />;
};

const App: React.FC = () => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userDataString = localStorage.getItem("user");
    if (userDataString) {
      const userData = JSON.parse(userDataString);
      setIsLoggedIn(userData.isLoggedIn);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/signup" element={<SignupForm />} />
          <Route path="/" element={<LoginForm />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<HomePage />} />}
          />
          <Route
            path="/product/view/:productId"
            element={<ProtectedRoute element={<ViewProduct />} />}
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
