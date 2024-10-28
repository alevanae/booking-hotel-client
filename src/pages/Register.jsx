import SignUp from "../comps/SignUp";
import Login from "../comps/Login";

import { useContext } from "react";
import userContext from "../contextAPI";
import Layout from "../comps/Layout";

function Register() {
  const { isSignUp } = useContext(userContext);
  return <Layout>{isSignUp ? <SignUp /> : <Login />}</Layout>;
}

export default Register;
