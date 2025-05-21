import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import MainLayout from "../layout/MainLayout";
import AddTask from "../pages/AddTask";
import PostedTask from "../pages/PostedTask";
import NotFound from "../pages/NotFound";
import BrowseTask from "../pages/BrowseTask";
import PrivateRoute from "../components/PrivateRoute";
import Login from "../pages/Login";
import Register from "../pages/Register";
import TaskDetail from "../pages/TaskDetail";
import TaskDetails from "../pages/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "browse-tasks",
        Component: BrowseTask,
      },
      {
        path: "login",
        Component: Login,
      },
      {
        path: "register",
        Component: Register,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
          </PrivateRoute>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <PrivateRoute>
            <TaskDetails></TaskDetails>
          </PrivateRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <AddTask></AddTask>
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <PostedTask></PostedTask>
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);

export default router;
