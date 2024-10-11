import { createBrowserRouter } from "react-router-dom";

/* */
import { DashboardAsideMenu } from "@/constants";

/* Layouts Loading */
import { AuthLayout, DashboardLayout } from "@/layouts";

/* */
import { ForgotPassword, Login, Otp } from "@/pages/Authentication";

/* */
import {
  Dashboard,
  Settings,
  Notifications,
  PaymentTracking,
  ProjectManagement,
  ProjectDetails,
} from "@/pages/Main";

const TaskTrackerRoute = createBrowserRouter(
  /* All Paths */
  [
    {
      path: "/",
      children: [
        {
          element: <DashboardLayout items={DashboardAsideMenu} />,
          children: [
            {
              index: true,
              element: <Dashboard />,
            },
            {
              path: "payment-tracking",
              element: <PaymentTracking />,
            },
            {
              path: "project-management",
              element: <ProjectManagement />,
            },
            {
              path: "project-details",
              element: <ProjectDetails />,
            },
            {
              path: "settings",
              element: <Settings />,
            },
            {
              path: "notifications",
              element: <Notifications />,
            },
          ],
        },
        {
          /* Authentication Routes For Super Admin */
          element: <AuthLayout />,
          children: [
            {
              path: "login",
              element: <Login />,
            },
            {
              path: "forgot-password",
              element: <ForgotPassword />,
            },
            {
              path: "otp",
              element: <Otp />,
            },
          ],
        },
      ],
    },
    {
      /* Default Route (404) */
      path: "*",
      element: <>404 - Page Not Found</>,
    },
  ],
  {
    /* Base URL */
    basename: "/",
  }
);

export default TaskTrackerRoute;
