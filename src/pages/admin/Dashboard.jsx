import { useContext, useEffect, useState } from "react";
import { useUserAuth } from "../hooks/useUserAuth";
import { userContext } from "../context/userContext";
import DashboardLayout from "../components/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../utilities/axiosInstance";
import { API_PATHS } from "../utilities/apiPaths";
import moment from "moment";
import DisplayInfoCard from "../components/cards/DisplayInfoCard";
import { IoMdCard } from "react-icons/io";
import { addSeparator } from "../utilities/helper";
import { LuArrowRight } from "react-icons/lu";
import TasksTable from "../components/TasksTable";
import CustomPieChart from "../components/charts/CustomPieChart";
import CustomBarChart from "../components/charts/CustomBarChart";

const COLORS = ["#ec8507", "#f1cb31", "#0b590b"];

const Dashboard = () => {
  useUserAuth();

  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);
  // console.log(user)
  const handleChartData = (data) => {
    const taskPercentage = data?.taskPercentage || null;
    const taskPriorityLevels = data?.taskPriorityLevels || null;

    const taskPercentageData = [
      { status: "Pending", count: taskPercentage?.Pending || 0 },
      { status: "Progress", count: taskPercentage?.Progress || 0 },
      { status: "Complete", count: taskPercentage?.Complete || 0 },
    ];

    setPieChartData(taskPercentageData);

    const PriorityLevelData = [
      { priority: "Low", count: taskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: taskPriorityLevels?.Medium || 0 },
      { priority: "High", count: taskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get(API_PATHS.TASKS.GET_DASHBOARD_DATA);
      if (res.data) {
        setDashboardData(res.data);
        handleChartData(res.data?.charts || null);
      }
    } catch (err) {
      console.error("error on fetch to get data", err);
    }
  };

  const handleSeeMore = () => {
    navigate("/admin/tasks");
  };

  useEffect(() => {
    getDashboardData();

    return () => {};
  }, []);

  return (
    <DashboardLayout activeMenu="Dashboard">
      <div className="card my-5">
        <div>
          <div className="col-span-3">
            <h2 className="text-xl font-medium md:text-2xl text-green-800">
              Hello {user?.name}
            </h2>
            <p className="text-xs md:text-[13px] text-gray-600 mt-1.5">
              Today is: {moment().format("ddd MM/DD/YYYY")}
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <DisplayInfoCard
            icon={<IoMdCard />}
            label="Total Tasks"
            value={addSeparator(
              dashboardData?.charts?.taskPercentage?.All || 0
            )}
            color="bg-green-800"
          />

          <DisplayInfoCard
            label="Pending Tasks"
            value={addSeparator(
              dashboardData?.charts?.taskPercentage?.Pending || 0
            )}
            color="bg-orange-600"
          />

          <DisplayInfoCard
            label="Progress Tasks"
            value={addSeparator(
              dashboardData?.charts?.taskPercentage?.Progress || 0
            )}
            color="bg-yellow-300"
          />

          <DisplayInfoCard
            label="Complete Tasks"
            value={addSeparator(
              dashboardData?.charts?.taskPercentage?.Complete || 0
            )}
            color="bg-lime-600"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-4 md:my-6">
        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Tasks Progress Percentages</h5>
            </div>

            <CustomPieChart data={pieChartData} colors={COLORS} />
          </div>
        </div>

        <div>
          <div className="card">
            <div className="flex items-center justify-between">
              <h5 className="font-medium">Priority Levels</h5>
            </div>

            <CustomBarChart data={barChartData} />
          </div>
        </div>

        <div className="md:col-span-2">
          <div className="card">
            <div className="flex items-center justify-between ">
              <h5 className="text-lg">Recent Tasks</h5>

              <button className="card-btn" onClick={handleSeeMore}>
                See All <LuArrowRight className="text-base" />
              </button>
            </div>

            <TasksTable tableData={dashboardData?.recentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
