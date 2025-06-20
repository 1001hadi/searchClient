import React, { useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/admin/Dashboard";
import CreateTask from "./pages/admin/CreateTask";
import ManageTasks from "./pages/admin/ManageTasks";
import ManageUsers from "./pages/admin/ManageUsers";
import UserDashboard from "./pages/user/UserDashboard";
import UserTasks from "./pages/user/UserTasks";
import UserTaskDetails from "./pages/user/UserTaskDetails";
import { UserProvider, userContext } from "./context/userContext";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <UserProvider>
      <div>
        <Router basename="/searchClient">
          <Routes>
            {/* authentication routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            {/* admin only routes */}
            <Route element={<PrivateRoute allowedRoles={["admin"]} />}>
              <Route path="/admin/dashboard" element={<Dashboard />} />
              <Route path="/admin/create-task" element={<CreateTask />} />
              <Route path="/admin/tasks" element={<ManageTasks />} />
              <Route path="/admin/users" element={<ManageUsers />} />
            </Route>
            {/* user routes */}
            <Route element={<PrivateRoute allowedRoles={["user", "admin"]} />}>
              <Route path="/user/dashboard" element={<UserDashboard />} />
              <Route path="/user/tasks" element={<UserTasks />} />
              <Route
                path="/user/task-details/:id"
                element={<UserTaskDetails />}
              />
            </Route>
            {/* default route */}
            <Route path="/" element={<Root />} />
          </Routes>
        </Router>
      </div>
      {/* handle popup msg */}
      <Toaster
        toastOptions={{
          className: "",
          style: {
            fontSize: "15px",
          },
        }}
      />
    </UserProvider>
  );
}

export default App;

const Root = () => {
  const { user, loading } = useContext(userContext);

  if (loading) return <Outlet />;

  if (!user) return <Navigate to="/login" />;

  return user.role === "admin" ? (
    <Navigate to="/admin/dashboard" />
  ) : (
    <Navigate to="/user/dashboard" />
  );
};
