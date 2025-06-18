import { useEffect, useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";
import { useContext } from "react";
import { userContext } from "../../context/userContext";
import DashboardLayout from "../../components/DashBoardLayout";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utilities/axiosInstance";
import { API_PATHS } from "../../utilities/apiPaths";
import moment from "moment";
import { addSeparator } from "../../utilities/helper";
import InfoCard from "../../components/Cards/InfoCard";
import { LuArrowRight } from "react-icons/lu";
import TasksTable from "../../components/TasksTable";
import CustomPieChart from "../../components/Charts/CustomPieChart";
import CustomBarChart from "../../components/charts/CustomBarChart";

const COLORS = ["#ec8507", "#f1cb31", "#0b590b"];

const UserDashboard = () => {
  useUserAuth();

  const { user } = useContext(userContext);
  const navigate = useNavigate();
  const [dashboardData, setDashboardData] = useState(null);
  const [pieChartData, setPieChartData] = useState([]);
  const [barChartData, setBarChartData] = useState([]);

  // Prepare Chart Data
  const prepareChartData = (data) => {
    const userTaskPercentage = data?.userTaskPercentage || null;
    const userTaskPriorityLevels = data?.userTaskPriorityLevels || {};

    const taskPercentageData = [
      { status: "Pending", count: userTaskPercentage?.Pending || 0 },
      { status: "Progress", count: userTaskPercentage?.Progress || 0 },
      { status: "Complete", count: userTaskPercentage?.Complete || 0 },
    ];

    setPieChartData(taskPercentageData);

    const PriorityLevelData = [
      { priority: "Low", count: userTaskPriorityLevels?.Low || 0 },
      { priority: "Medium", count: userTaskPriorityLevels?.Medium || 0 },
      { priority: "High", count: userTaskPriorityLevels?.High || 0 },
    ];

    setBarChartData(PriorityLevelData);
  };

  const getDashboardData = async () => {
    try {
      const res = await axiosInstance.get(
        API_PATHS.TASKS.GET_USER_DASHBOARD_DATA
      );
      if (res.data) {
        setDashboardData(res.data);
        prepareChartData(res.data?.charts || null);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleSeeMore = () => {
    navigate("/user/tasks");
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
            <h2 className="text-xl md:text-2xl">Hello! {user?.name}</h2>
            <p className="text-xs md:text-[13px] text-gray-400 mt-1.5">
              Today is: {moment().format("ddd MM/DD/YYYY")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 mt-5">
          <InfoCard
            label="Total Tasks"
            value={addSeparator(
              dashboardData?.charts?.userTaskPercentage?.All || 0
            )}
            color="bg-green-800"
          />

          <InfoCard
            label="Pending Tasks"
            value={addSeparator(
              dashboardData?.charts?.userTaskPercentage?.Pending || 0
            )}
            color="bg-orange-500"
          />

          <InfoCard
            label="In Progress Tasks"
            value={addSeparator(
              dashboardData?.charts?.userTaskPercentage?.Progress || 0
            )}
            color="bg-yellow-500"
          />

          <InfoCard
            label="Completed Tasks"
            value={addSeparator(
              dashboardData?.charts?.userTaskPercentage?.Complete || 0
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

            <TasksTable tableData={dashboardData?.userRecentTasks || []} />
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default UserDashboard;
