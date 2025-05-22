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
import TaskDetails from "../pages/TaskDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "browse-tasks",
        element: <BrowseTask />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        ),
      },
      {
        path: "tasks/:id",
        element: (
          <PrivateRoute>
            <TaskDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "add-task",
        element: (
          <PrivateRoute>
            <AddTask />
          </PrivateRoute>
        ),
      },
      {
        path: "my-tasks",
        element: (
          <PrivateRoute>
            <PostedTask />
          </PrivateRoute>
        ),
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

export default router;
