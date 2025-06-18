import { useContext, useState } from "react";
import AuthLayout from "@/components/layouts/AuthLayout";
import { validateEmail } from "@/utilities/helper";
import AddProfileImg from "@/components/inputs/AddProfileImg";
import Input from "@/components/inputs/Input";
import { Link, useNavigate } from "react-router-dom";
import axiosInstance from "@/utilities/axiosInstance";
import { API_PATHS } from "@/utilities/apiPaths";
import { userContext } from "@/context/userContext";
import uploadImage from "@/utilities/imageUpload";

const Register = () => {
  const [profileImage, setProfileImage] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [adminInviteCode, setAdminInviteCode] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName) {
      setError("Enter full name!");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email must be valid!");
      return;
    }

    if (!password || password.length < 6) {
      setError("Password required!");
      return;
    }

    setError("");

    // handle api call
    try {
      // upload profile image
      if (profileImage) {
        const imgUploadRes = await uploadImage(profileImage);
        profileImageUrl = imgUploadRes.imgUrl;
      }
      const res = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        name: fullName,
        email,
        password,
        profileImageUrl,
        adminCode: adminInviteCode,
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
    } catch (err) {
      if (err.res && err.res.data.message) {
        setError(err.res.data.message);
      } else {
        setError("Error occurred, try again!");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center ">
        <h3 className="text-xl font-semibold text-black">Create Account</h3>
        <p className="text-s text-slate-700 mt-[5px] mb-6">
          Enter your info and join
        </p>

        <form onSubmit={handleRegister}>
          <AddProfileImg image={profileImage} setImage={setProfileImage} />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              type="text"
              value={fullName}
              label="Full Name"
              onChange={({ target }) => setFullName(target.value)}
              placeholder="First & Last"
            />
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
            <Input
              type="text"
              value={adminInviteCode}
              onChange={({ target }) => setAdminInviteCode(target.value)}
              label="Admin Code"
              placeholder="Enter admin invite code here"
            />
          </div>

          {error && <p className="text-red-500 text-s pb-2.5">{error}</p>}

          <button type="submit" className="btn-primary">
            Register
          </button>

          <p className="text-[15px] text-slate-800 mt-3">
            Already a user? go to login{" "}
            <Link className="font-medium text-primary underline" to="/login">
              here
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Register;
