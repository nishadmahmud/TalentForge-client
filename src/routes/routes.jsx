import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import MainLayout from "../layout/MainLayout";
import AddTask from "../pages/AddTask";
import PostedTask from "../pages/PostedTask";
import NotFound from "../pages/NotFound";
import BrowseTask from "../pages/BrowseTask";

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
        path: "profile",
        element: (
          <PrivateRoute>
            <Profile></Profile>
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
        path: "posted-task",
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
