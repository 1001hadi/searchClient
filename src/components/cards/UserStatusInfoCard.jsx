import React from "react";

const UserStatusInfoCard = ({ label, count, status }) => {
  const handleStatusColor = () => {
    switch (status) {
      case "Progress":
        return "text-yellow-500 bg-gray-50";

      case "Complete":
        return "text-green-700 bg-gray-50";

      default:
        return "text-orange-500 bg-gray-50";
    }
  };

  return (
    <div
      className={`flex-1 items-center text-[12px] font-medium ${handleStatusColor()} px-2 py-0.5 rounded `}
    >
      <span className="text-[14px] font-semibold">{count}</span> <br /> {label}
    </div>
  );
};

export default UserStatusInfoCard;
