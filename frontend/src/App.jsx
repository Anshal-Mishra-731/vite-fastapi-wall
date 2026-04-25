import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";

import serviceAuth from "./interaction/auth";
import { login, logout } from "./store/authSlice";

import Homepage from "./pages/Homepage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SignUpPage from "./pages/SignUpPage.jsx";
import CreatePostPage from "./pages/CreatePostPage.jsx";

function App() {

  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      serviceAuth.getCurrentUser()
        .then((userData) => {
          if (userData) {
            dispatch(login(userData.data));
          } else {
            dispatch(logout());
          }
        })
        .catch(() => {
          dispatch(logout());
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-white">
        Loading...
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main>

        <Routes>

          <Route path="/" element={<Homepage />} />

          <Route path="/login" element={<LoginPage />} />

          <Route path="/signup" element={<SignUpPage />} />

          <Route path="/posts/new" element={<CreatePostPage />} />

          <Route path="/posts/:id/edit" element={<CreatePostPage />} />

        </Routes>

      </main>
    </div>
  );
}

export default App;