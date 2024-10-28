import { useContext, useRef } from "react";
import styles from "../styles";
import userContext from "../contextAPI";
import { useNavigate } from "react-router-dom";
import domain from "../domain";

function Login() {
  const email = useRef();
  const password = useRef();
  const { setUser, setUserId, setIsLogin, setIsSignUp } =
    useContext(userContext);
  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email: email.current.value,
        password: password.current.value,
      };
      const res = await fetch(`${domain}/user/client/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setUser(data.data);
      setUserId(data.data._id);
      setIsLogin(true);
      localStorage.setItem("user", data.data._id);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[500px] m-auto justify-center items-center mt-[100px] gap-2">
      <h2 className="text-[32px] capitalize font-semibold pb-10">login</h2>
      <input
        type="text"
        className={`w-1/2 ${styles.input}`}
        placeholder="Email or username"
        ref={email}
        required
      />
      <input
        type="password"
        className={`w-1/2 ${styles.input}`}
        placeholder="Password"
        ref={password}
        required
      />
      <button type="submit" className={`${styles.altButton} w-1/2`}>
        Login
      </button>
      <button
        type="button"
        className="hover:text-blue-700"
        onClick={() => setIsSignUp(true)}>
        Create new account
      </button>
    </form>
  );
}

export default Login;
