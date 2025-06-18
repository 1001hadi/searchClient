import React from "react";
import Login_IMG from "../../assets/login0.png";

const AuthLayout = ({ children }) => {
  return (
    <div className="flex">
      <div className="w-screen h-screen md:w[60w] px-12 pt-8 pb-12">
        <h2 className="text-2xl font-medium text-black text-green-800">
          Active Tasks
        </h2>
        {children}
      </div>
      <div className="hidden md:flex w-[80vw] h-screen item-center justify-center overflow-hidden">
        <img src={Login_IMG} alt="task-image" className="lg:w-[100%]" />
      </div>
    </div>
  );
};

export default AuthLayout;
