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
import Login from './pages/Login';
import Register from './pages/Register';
import TeamRegistration from './pages/TeamRegistration/TeamRegistration';
import Users from './pages/Admin/User/Users';
import Tournaments from './pages/Admin/Tournament/Tournaments';
import CreateTournament from './pages/Admin/Tournament/CreateTournament';
import OpenTournaments from './pages/TeamRegistration/OpenTournaments';
import { ToastContainer } from 'react-toastify';
import Home from './pages/Home/Home';
import useAuth from './hooks/useAuth';

const routes = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<RootLayout />}>
        <Route path="" element={<Home />} />
        <Route path="team-registration" element={<OpenTournaments />} />
        <Route path="team-registration/:tournamentID" element={<TeamRegistration />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
      <Route path="admin" element={<AdminLayout />}>
        <Route path="users" element={<Users />} />
        <Route path="tournaments" element={<TournamentLayout />}>
          <Route path="" element={<Tournaments />} />
          <Route path="create-tournament" element={<CreateTournament />} />
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
        theme="colored"
      />
      <RouterProvider router={routes} />
    </>
  );
};

export default App;
