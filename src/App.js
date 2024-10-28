import { createHashRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Detail from "./pages/Detail";
import Book from "./pages/Book";
import Transaction from "./pages/Transaction";
import { useEffect, useState } from "react";
import userContext from "./contextAPI";
import Search from "./pages/Search";
import domain from "./domain";

const router = createHashRouter([
  { path: "/", element: <Home /> },
  { path: "/search", element: <Search /> },
  { path: "/register", element: <Register /> },
  { path: "/detail/:hotelId", element: <Detail /> },
  { path: "/book/:hotelId", element: <Book /> },
  { path: "/transaction", element: <Transaction /> },
]);

function App() {
  const [userId, setUserId] = useState(null);
  const [isLogin, setIsLogin] = useState(false);
  const [user, setUser] = useState(null);
  const [isSignUp, setIsSignUp] = useState(false);
  const [searchInfo, setSearchInfo] = useState({
    city: "",
    peopleQuantity: 1,
    roomQuantity: 1,
  });
  useEffect(() => {
    async function getUser() {
      try {
        const getUserId = localStorage.getItem("user");
        if (!getUserId) return;
        const res = await fetch(`${domain}/user/client/auto-login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ userId: getUserId }),
        });
        const data = await res.json();
        if (data.status !== "success") {
          localStorage.removeItem("user");
          return;
        }
        setUserId(getUserId);
        setUser(data.data);
        setIsLogin(true);
      } catch (err) {
        console.log(err.message);
      }
    }
    getUser();
  }, []);

  return (
    <userContext.Provider
      value={{
        userId,
        setUserId,
        isLogin,
        setIsLogin,
        user,
        setUser,
        isSignUp,
        setIsSignUp,
        searchInfo,
        setSearchInfo,
      }}>
      <RouterProvider router={router}></RouterProvider>
    </userContext.Provider>
  );
}

export default App;
