import React, { useEffect, useState } from "react";
import MainLayout from "../../components/layouts/MainLayout";
import { useLocation, useNavigate } from "react-router-dom";
import { API_PATHS } from "../../utilities/apiPaths";
import { PRIORITY_DATA } from "../../utilities/data";
import axiosInstance from "../../utilities/axiosInstance";
import toast from "react-hot-toast";
import moment from "moment";
import SelectDropdown from "../../components/Inputs/SelectDropdown";
import SelectUsers from "../../components/Inputs/SelectUsers";
import CheckListInput from "../../components/Inputs/CheckListInput";
import AddAttachmentsInput from "../../components/Inputs/AddAttachmentsInput";
import Modal from "../../components/Modal";
import RemoveAlert from "../../components/RemoveAlert";

const CreateTask = () => {
  const location = useLocation();
  const { taskId } = location.state || {};
  const navigate = useNavigate();

  const [taskData, setTaskData] = useState({
    title: "",
    description: "",
    priority: "Low",
    dueDate: null,
    assignedTo: [],
    checklist: [],
    attachments: [],
  });
  const [currentTask, setCurrentTask] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [removeAlert, setRemoveAlert] = useState(false);

  const handleValueChange = (key, value) => {
    setTaskData((prevData) => ({ ...prevData, [key]: value }));
  };

  //reset the form
  const clearData = () => {
    setTaskData({
      title: "",
      description: "",
      priority: "Low",
      dueDate: null,
      assignedTo: [],
      checklist: [],
      attachments: [],
    });
  };
  // create task
  const createTask = async () => {
    setLoading(true);

    try {
      const checklist = taskData.checklist?.map((item) => ({
        text: item,
        complete: false,
      }));

      const res = await axiosInstance.post(API_PATHS.TASKS.CREATE_TASK, {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        checklist: checklist,
      });

      toast.success("Task created successfully");

      clearData();
    } catch (err) {
      console.error("error creating task:", err);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  // handle submit
  const handleSubmit = async () => {
    setError(null);
    // input validator for error
    if (!taskData.title.trim()) {
      setError("Title is required.");
      return;
    }
    if (!taskData.description.trim()) {
      setError("Description must be added!");
      return;
    }

    if (taskData.assignedTo?.length === 0) {
      setError("Task must be assigned to user!");
      return;
    }

    if (!taskData.dueDate) {
      setError("Due date  required.");
      return;
    }

    if (taskData.checklist?.length === 0) {
      setError("Checklist must be added!");
      return;
    }

    if (taskId) {
      handleEditTask();
      return;
    }

    createTask();
  };

  // get task by id
  const getTaskDetailsById = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_TASK_BY_ID(taskId)
      );

      if (res.data) {
        const taskInfo = res.data;
        setCurrentTask(taskInfo);

        setTaskData((prevState) => ({
          title: taskInfo.title,
          description: taskInfo.description,
          priority: taskInfo.priority,
          dueDate: taskInfo.dueDate
            ? moment(taskInfo.dueDate).format("YYYY-MM-DD")
            : null,
          assignedTo: taskInfo?.assignedTo?.map((item) => item?._id) || [],
          checklist: taskInfo?.checklist?.map((item) => item?.text) || [],
          attachments: taskInfo?.attachments || [],
        }));
      }
    } catch (err) {
      console.error("can't fetch", err);
    }
  };

  // edit task
  const handleEditTask = async () => {
    setLoading(true);

    try {
      const checklist = taskData.checklist?.map((item) => {
        const prevChecklist = currentTask?.checklist || [];
        const matchedTask = prevChecklist.find((task) => task.text === item);

        return {
          text: item,
          complete: matchedTask ? matchedTask.complete : false,
        };
      });

      const res = await axiosInstance.put(API_PATHS.TASKS.UPDATE_TASK(taskId), {
        ...taskData,
        dueDate: new Date(taskData.dueDate).toISOString(),
        checklist: checklist,
      });

      toast.success("Task edited");
      navigate("/admin/tasks");
    } catch (err) {
      console.error("can't edit task!:", err);
    } finally {
      setLoading(false);
    }
  };

  // remove task
  const handleRemoveTask = async () => {
    try {
      await axiosInstance.delete(API_PATHS.TASKS.DELETE_TASK(taskId));

      setRemoveAlert(false);
      toast.success("Task deleted");
      navigate("/admin/tasks");
    } catch (err) {
      console.error(
        "Error deleting:",
        err.response?.data?.message || err.message
      );
    }
  };

  useEffect(() => {
    if (taskId) {
      getTaskDetailsById(taskId);
    }
    return () => {};
  }, [taskId]);

  return (
    <MainLayout activeMenu="Create Task">
      <div className="mt-5">
        <div className="grid grid-cols-1 md:grid-cols-4 mt-4">
          <div className="form-card col-span-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl md:text-xl font-medium text-green-800">
                {taskId ? "Update Task" : "Create Task"}
              </h2>

              {taskId && (
                <button
                  className="flex items-center gap-1.5 text-[13px] font-medium text-white bg-red-600 rounded px-2 py-1 border border-rose-100 hover:border-rose-300 cursor-pointer"
                  onClick={() => setRemoveAlert(true)}
                >
                  Remove Task
                </button>
              )}
            </div>

            <div className="mt-4">
              <label className="text-xs font-medium text-slate-600">
                Task Title
              </label>

              <input
                placeholder="Task name..."
                className="form-input"
                value={taskData.title}
                onChange={({ target }) =>
                  handleValueChange("title", target.value)
                }
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Description
              </label>

              <textarea
                placeholder="Describe..."
                className="form-input"
                rows={4}
                value={taskData.description}
                onChange={({ target }) =>
                  handleValueChange("description", target.value)
                }
              />
            </div>
            <div className="grid grid-cols-12 gap-4 mt-2">
              <div className="col-span-12 md:col-span-3">
                <label className="text-xs font-medium text-slate-600">
                  Assign To
                </label>

                <SelectUsers
                  selectedUsers={taskData.assignedTo}
                  setSelectedUsers={(value) => {
                    handleValueChange("assignedTo", value);
                  }}
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Priority
                </label>

                <SelectDropdown
                  options={PRIORITY_DATA}
                  value={taskData.priority}
                  onChange={(value) => handleValueChange("priority", value)}
                  placeholder="Select Priority"
                />
              </div>
              <div className="col-span-6 md:col-span-4">
                <label className="text-xs font-medium text-slate-600">
                  Due Date
                </label>

                <input
                  className="form-input"
                  value={taskData.dueDate}
                  onChange={({ target }) =>
                    handleValueChange("dueDate", target.value)
                  }
                  type="date"
                />
              </div>
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Task Checklist
              </label>

              <CheckListInput
                checklist={taskData?.checklist}
                setCheckList={(value) => handleValueChange("checklist", value)}
              />
            </div>
            <div className="mt-3">
              <label className="text-xs font-medium text-slate-600">
                Add Attachments
              </label>

              <AddAttachmentsInput
                attachments={taskData?.attachments}
                setAttachments={(value) =>
                  handleValueChange("attachments", value)
                }
              />
            </div>
            {error && (
              <p className="text-xs font-medium text-red-700 mt-5">{error}</p>
            )}
            <div className="flex justify-end mt-7">
              <button
                className="add-btn"
                onClick={handleSubmit}
                disabled={loading}
              >
                {taskId ? "UPDATE TASK" : "CREATE TASK"}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={removeAlert}
        onClose={() => setRemoveAlert(false)}
        title="Remove Task"
      >
        <RemoveAlert
          content="Do you want remove this task?"
          onRemove={() => handleRemoveTask()}
        />
      </Modal>
    </MainLayout>
  );
};

export default CreateTask;
