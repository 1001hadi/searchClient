import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthLayout from "../../components/layouts/AuthLayout";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utilities/helper";
import axiosInstance from "../../utilities/axiosInstance";
import { API_PATHS } from "../../utilities/apiPaths";
import { userContext } from "../../context/userContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Email must be valid!");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password required!");
      return;
    }

    setError("");

    //handle api call
    try {
      const res = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, role } = res.data;

      if (token) {
        localStorage.setItem("token", token);
        updateUser(res.data);

        // redirect depend on role
        role === "admin"
          ? navigate("/admin/dashboard")
          : navigate("/user/dashboard");
      }
    } catch (error) {
      if (error.res && error.res.data.message) {
        setError(error.res.data.message);
      } else {
        setError("Error occurred, try again!");
      }
    }
  };

  return (
    <>
      <AuthLayout>
        <div className="lg:w-[70% h-3/4 md:h-full flex flex-col justify-center">
          <h3 className="text-xl front-semibold text-black">
            Welcome To Active Tasks
          </h3>
          <p className="text-md text-slate-700 mt-[5px] mb-6">
            Enter your credentials to login
          </p>
          <form onSubmit={handleLogin}>
            <Input
              type="text"
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="task@login.com"
            />

            <Input
              type="password"
              value={password}
              onChange={({ target }) => setPassword(target.value)}
              label="Password"
              placeholder="Password min 6 characters"
            />

            {error && <p className="text-red-500 text-s pb-2.5">{error}</p>}

            <button type="submit" className="btn-primary">
              Login
            </button>

            <p className="text-[15px] text-slate-800 mt-3">
              Not a user? you can register{" "}
              <Link
                className="font-medium text-primary underline"
                to="/register"
              >
                here
              </Link>
            </p>
          </form>
        </div>
      </AuthLayout>
    </>
  );
};

export default Login;
