import moment from "moment";
import Progress from "../Progress";
import { LuPaperclip } from "react-icons/lu";

const TaskCard = ({
  title,
  description,
  priority,
  status,
  progress,
  createdAt,
  dueDate,
  assignedTo,
  attachmentCount,
  completedChecklistCount,
  checklist,
  onClick,
}) => {
  // console.log(progress);
  const getStatusTagColor = () => {
    switch (status) {
      case "Progress":
        return "text-white bg-yellow-500 ";

      case "Complete":
        return "text-white bg-green-700 ";

      default:
        return "text-white bg-orange-500 ";
    }
  };

  const getPriorityTagColor = () => {
    switch (priority) {
      case "Low":
        return "text-white bg-teal-500 ";

      case "Medium":
        return "text-white bg-orange-300";

      default:
        return "text-white bg-red-600";
    }
  };

  const displayAssignedTo = () =>
    Array.isArray(assignedTo) ? assignedTo.join(", ") : assignedTo;

  return (
    <div
      className="bg-white rounded-xl py-4 shadow-md shadow-gray-100 border border-gray-200/50 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-end justify-between px-2">
        <div
          className={`text-[11px] font-medium ${getStatusTagColor()} px-4 py-0.5 rounded `}
        >
          {status}
        </div>
        <div
          className={`text-[11px] font-medium ${getPriorityTagColor()} px-4 py-0.5 rounded`}
        >
          {priority}
        </div>
      </div>

      <div className="px-2">
        <p className="text-sm font-medium text-gray-800 mt-4 line-clamp-2">
          {title}
        </p>

        <p className="text-xs text-gray-500 mt-1.5 line-clamp-2 leading-[18px]">
          {description}
        </p>

        <p className="text-[13px] text-gray-700/80 font-medium mt-2 mb-2 leading-[18px]">
          Task Done:{" "}
          <span className="font-semibold text-gray-700">
            {completedChecklistCount} / {checklist.length || 0}
          </span>
        </p>

        <Progress progress={progress} status={status} />
      </div>

      <div className="px-4">
        <div className="flex items-center justify-between my-1">
          <div>
            <label className="text-xs text-gray-500">Start Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(createdAt).format("MM/DD/YYYY")}
            </p>
          </div>

          <div>
            <label className="text-xs text-gray-500">Due Date</label>
            <p className="text-[13px] font-medium text-gray-900">
              {moment(dueDate).format("MM/DD/YYYY")}
            </p>
          </div>
        </div>

        <div className="flex items-center justify-between  mt-3">
          <div>
            <label className="text-xs text-gray-500">Assign To:</label>
            <div className="text-sm">{displayAssignedTo()}</div>
          </div>

          {attachmentCount > 0 && (
            <div className="flex items-center gap-2 bg-green-50 px-2.5 py-1.5 rounded-lg">
              <LuPaperclip className="text-primary" />{" "}
              <span className="text-xs text-gray-900">{attachmentCount}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
