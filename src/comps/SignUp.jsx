import { useContext, useRef } from "react";
import styles from "../styles";
import userContext from "../contextAPI";
import domain from "../domain";

function SignUp() {
  const { setIsSignUp } = useContext(userContext);
  const email = useRef();
  const username = useRef();
  const phoneNumber = useRef();
  const password = useRef();
  const fullName = useRef();
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const user = {
        email: email.current.value,
        username: username.current.value,
        phoneNumber: phoneNumber.current.value,
        password: password.current.value,
        fullName: fullName.current.value,
      };
      const res = await fetch(`${domain}/user`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message);
      setIsSignUp(false);
      console.log(data.status);
    } catch (err) {
      console.log(err.message);
    }
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col max-w-[500px] m-auto justify-center items-center mt-[100px] gap-2">
      <h2 className="text-[32px] capitalize font-semibold pb-10">sign up</h2>
      <input
        type="email"
        className={`w-1/2 ${styles.input}`}
        placeholder="Your email"
        ref={email}
        required
      />
      <input
        type="text"
        className={`w-1/2 ${styles.input}`}
        placeholder="Your Username"
        ref={username}
        required
      />
      <input
        type="tel"
        className={`w-1/2 ${styles.input}`}
        placeholder="Your Phone Number"
        ref={phoneNumber}
        required
      />
      <input
        type="password"
        className={`w-1/2 ${styles.input}`}
        placeholder="Password"
        ref={password}
        required
      />
      <input
        type="text"
        className={`w-1/2 ${styles.input}`}
        placeholder="Your Full Name"
        ref={fullName}
        required
      />
      <button type="submit" className={`${styles.altButton} w-1/2`}>
        create an account
      </button>
    </form>
  );
}

export default SignUp;
