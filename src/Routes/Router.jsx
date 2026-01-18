import Login from "../Component/Login";
import Signup from "../Component/Signup";
import Dashboard from "../Component/Dashboard";
import Sidebar from "../Component/Sidebar";
import Add from "../Component/Add";
import Show from "../Component/Show";
import ProtectedRoute from "../Component/ProtectedRoute";
import AdminPanel from "../Component/AdminPanel";
import ForgotEmail from "../Component/ForgotEmail";
import ChangePassword from "../Component/ChangePassword";
import AboutPage from "../Component/About";
import EditHadith from "../Component/EditHadith";

let router = [
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  },
  {
     path: '/ForgotEmail',
    element: <ForgotEmail/>
  },
  {
    path:'/ChangePassword',
    element:<ChangePassword/>
  },
  {
    path: '/Dashboard',
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    )
  },
  {
    path: '/About',
    element: (
      <ProtectedRoute>
        <AboutPage />
      </ProtectedRoute>
    )
  },
  {
    path: '/Sidenavbar',
    element: (
      <ProtectedRoute>
        <Sidebar />
      </ProtectedRoute>
    )
  },
  {
    path: '/Add',
    element: (
      <ProtectedRoute>
        <Add />
      </ProtectedRoute>
    )
  },
  {
    path: 'Dashboard/Show/:str',
    element: (
      <ProtectedRoute>
        <Show />
      </ProtectedRoute>
    )
  },
  {
    path:'/AdminPanel',
    element:(
     <ProtectedRoute>
        <AdminPanel/>
     </ProtectedRoute>
    )
  },
  {
    path:'/Edit/:str1/:str2',
    element:(
     <ProtectedRoute>
        <EditHadith/>
     </ProtectedRoute>
    )
  }
];

export default router;
