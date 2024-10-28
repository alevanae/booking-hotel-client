import { useContext } from "react";
import styles from "../styles";
import { useNavigate } from "react-router-dom";
import userContext from "../contextAPI";

function AfterLogin() {
  const navigate = useNavigate();
  const { setIsLogin, user } = useContext(userContext);
  function handleLogout() {
    setIsLogin(false);
    localStorage.removeItem("user");
  }
  return (
    <nav className="bg-blue-700 flex justify-between items-center py-4 px-8 text-[20px]">
      <h1
        className="text-gray-100 cursor-pointer"
        onClick={() => navigate("/")}>
        Booking
      </h1>
      <div className="flex gap-2 justify-between items-center">
        <h2 className="text-gray-100 pr-4">Hello {user.username}</h2>
        <button
          type="button"
          className={styles.button}
          onClick={() => navigate("/transaction")}>
          transaction
        </button>
        <button type="button" className={styles.button} onClick={handleLogout}>
          logout
        </button>
      </div>
    </nav>
  );
}

export default AfterLogin;
