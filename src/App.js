import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider
} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import pingPongLoader from './img/ping-pong-loader-crop1.gif';

// layout imports
import AdminLayout from './layouts/AdminLayout';
import RootLayout from './layouts/RootLayout';
import TournamentLayout from './layouts/TournamentLayout';

// page imports
import { ToastContainer } from 'react-toastify';
import ProtectedRoute from './components/ProtectedRoute';
import useAuth from './hooks/useAuth';
import HomePageEditor from './pages/Admin/HomePageEditor';
import CreateTournament from './pages/Admin/Tournament/CreateTournament';
import Teams from './pages/Admin/Tournament/Teams';
import Tournaments from './pages/Admin/Tournament/Tournaments';
import Users from './pages/Admin/User/Users';
import Home from './pages/Home/Home';
import Login from './pages/Login';
import MyRegistration from './pages/MyRegistration';
import Register from './pages/Register';
import OpenTournaments from './pages/TeamRegistration/OpenTournaments';
import TeamRegistration from './pages/TeamRegistration/TeamRegistration';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Home />} />
        <Route path="team-registration" element={<OpenTournaments />} />
        <Route path="my-registration" element={<MyRegistration />} />
        <Route path="team-registration/:tournamentID" element={<TeamRegistration />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="success" element={<Success />} />
        <Route path="cancel" element={<Cancel />} /> */}
      </Route>
      <Route
        path="admin"
        element={
          <ProtectedRoute role="Administrator">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route path="" element={<HomePageEditor />} />
        <Route path="users" element={<Users />} />
        <Route path="tournaments" element={<TournamentLayout />}>
          <Route path="" element={<Tournaments />} />
          <Route path="create-tournament" element={<CreateTournament />} />
          <Route path="teams/:tournamentId" element={<Teams />} />
        </Route>
      </Route>
    </>
  )
);

const App = () => {
  const { rootLoading } = useAuth();
  return rootLoading ? (
    <div className="bg-white flex justify-center items-center h-screen w-full">
      <img src={pingPongLoader} alt="loader" />
    </div>
  ) : (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
