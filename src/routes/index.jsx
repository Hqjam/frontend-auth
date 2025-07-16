import { createBrowserRouter } from "react-router-dom";
import LandingPage from "../pages/LandingPage";
import LoginPage from "../pages/LoginPage";
import SignupPage from "../pages/SignupPage";
import FeedPage from "../pages/FeedPage";
import RequestsPage from "../pages/RequestsPage";
import MatchesPage from "../pages/MatchesPage";
import ProfilePage from "../pages/ProfilePage";
import SentRequestsPage from "../pages/SentRequestsPage";


const router = createBrowserRouter([
  { path: "/", element: <LandingPage /> },
  { path: "/login", element: <LoginPage /> },
  { path: "/signup", element: <SignupPage /> },
  { path: "/feed", element: <FeedPage /> },
  { path: "/requests", element: <RequestsPage /> },
  { path: "/matches", element: <MatchesPage /> },
  { path: "/profile", element: <ProfilePage /> },
  { path: "/sent", element: <SentRequestsPage /> },
]);

export default router;