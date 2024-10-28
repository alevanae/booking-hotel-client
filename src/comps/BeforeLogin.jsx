import { useNavigate } from "react-router-dom";
import styles from "../styles";
import { useContext } from "react";
import userContext from "../contextAPI";

function BeforeLogin() {
  const navigate = useNavigate();
  const { setIsSignUp } = useContext(userContext);
  return (
    <nav className="bg-blue-700 flex justify-between items-center py-4 px-8 text-[20px]">
      <h1
        className="text-gray-100 cursor-pointer"
        onClick={() => navigate("/")}>
        Booking
      </h1>
      <div className="flex gap-2">
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setIsSignUp(true);
            navigate("/register");
          }}>
          sign up
        </button>
        <button
          type="button"
          className={styles.button}
          onClick={() => {
            setIsSignUp(false);
            navigate("/register");
          }}>
          login
        </button>
      </div>
    </nav>
  );
}

export default BeforeLogin;
