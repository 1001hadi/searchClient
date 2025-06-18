import React from "react";
// import UserStatusInfoCard from "./UserStatusInfoCard";
const UserCard = ({ userInfo }) => {
  return (
    <div className="user-card p-2 cursor-pointer">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <img
            src={userInfo?.profileImageUrl}
            alt={`Avatar`}
            className="w-12 h-12 rounded-full border-2 border-white"
          />

          <div>
            <p className="text-sm font-medium">{userInfo?.name}</p>
            <p className="text-xs text-gray-500">{userInfo?.email}</p>
          </div>
        </div>
      </div>

      <div className="flex items-end gap-3 mt-5">
        <UserStatusInfoCard
          label="Pending"
          count={userInfo?.pendingTask || 0}
          status="Pending"
        />
        <UserStatusInfoCard
          label="Progress"
          count={userInfo?.progressTask || 0}
          status="Progress"
        />
        <UserStatusInfoCard
          label="Complete"
          count={userInfo?.completeTask || 0}
          status="Complete"
        />
      </div>
    </div>
  );
};

export default UserCard;

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
