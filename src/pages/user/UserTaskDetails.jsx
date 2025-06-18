import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance";
import { API_PATHS } from "../../utilities/apiPaths";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import moment from "moment";

import InfoBox from "../../components/InfoBox";
import Checklist from "../../components/Checklist";
import Attachment from "../../components/Attachment";

const UserTaskDetails = () => {
  const { id } = useParams();
  const [task, setTask] = useState(null);

  const getStatusTagColor = (status) => {
    switch (status) {
      case "Progress":
        return "text-white bg-yellow-500 ";

      case "Complete":
        return "text-white bg-lime-700 ";

      default:
        return "text-white bg-orange-500 ";
    }
  };

  // get Task info by ID
  const getTaskDetailsByID = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_TASK_BY_ID(id));

      if (res.data) {
        const taskInfo = res.data;
        setTask(taskInfo);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  // handle  checkbox
  const editChecklist = async (index) => {
    const checklist = [...task?.checklist];
    const taskId = id;

    if (checklist && checklist[index]) {
      checklist[index].completed = !checklist[index].completed;

      try {
        const response = await axiosInstance.put(
          API_PATHS.TASKS.UPDATE_CHECKLIST(taskId),
          { checklist: checklist }
        );
        if (response.status === 200) {
          setTask(response.data?.task || task);
        } else {
          // Optionally revert the toggle if the API call fails.
          checklist[index].completed = !checklist[index].completed;
        }
      } catch (error) {
        checklist[index].completed = !checklist[index].completed;
      }
    }
  };

  // Handle attachment link
  const handleLinkClick = (link) => {
    // set default to https
    if (!/^https?:\/\//i.test(link)) {
      link = "https://" + link;
    }
    window.open(link, "_blank");
  };

  useEffect(() => {
    if (id) {
      getTaskDetailsByID();
    }
    return () => {};
  }, [id]);
  return (
    <DashboardLayout activeMenu="My Tasks">
      <div className="mt-5">
        {task && (
          <div className="grid grid-cols-1 md:grid-cols-3 mt-4">
            <div className="form-card col-span-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm md:text-xl font-medium">
                  {task?.title}
                </h2>

                <div
                  className={`text-[11px] md:text-[13px] font-medium ${getStatusTagColor(
                    task?.status
                  )} px-4 py-0.5 rounded `}
                >
                  {task?.status}
                </div>
              </div>

              <div className="mt-4">
                <InfoBox label="Description" value={task?.description} />
              </div>

              <div className="grid grid-cols-12 gap-4 mt-4">
                <div className="col-span-6 md:col-span-4">
                  <InfoBox label="Priority" value={task?.priority} />
                </div>
                <div className="col-span-6 md:col-span-4">
                  <InfoBox
                    label="Due Date"
                    value={
                      task?.dueDate
                        ? moment(task?.dueDate).format("Do MMM YYYY")
                        : "N/A"
                    }
                  />
                </div>
              </div>

              <div className="mt-2">
                <label className="text-xs font-medium text-slate-500">
                  Checklist
                </label>

                {task?.checklist?.map((item, index) => (
                  <Checklist
                    key={`checklist_${index}`}
                    text={item.text}
                    isChecked={item?.completed}
                    onChange={() => editChecklist(index)}
                  />
                ))}
              </div>

              {task?.attachments?.length > 0 && (
                <div className="mt-2">
                  <label className="text-xs font-medium text-slate-500">
                    Attachments
                  </label>

                  {task?.attachments?.map((link, index) => (
                    <Attachment
                      key={`link_${index}`}
                      link={link}
                      index={index}
                      onClick={() => handleLinkClick(link)}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UserTaskDetails;
