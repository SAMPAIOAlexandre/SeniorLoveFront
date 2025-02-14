import { createBrowserRouter } from "react-router-dom";
import MainLayout from "./layouts/MainLayout.tsx";
import ProtectedRoute from "./pages/Auth/ProtectedRoute.tsx";

// Pages publiques
//----------------
import HomePage from "./pages/Home/HomePage.tsx";


// Pages protégées
//----------------
import EventsLists from "./pages/Events/EventsLists.tsx";
import EventDetail from "./pages/Events/EventDetail.tsx";
import EventCreate from "./pages/Events/EventCreate.tsx";

// import EventEdit

import ProfileDetail from "./pages/Profile/ProfileDetail.tsx";
import ProfileEdit from "./pages/Profile/ProfileEdit.tsx";
import ProfilesLists from "./pages/Profile/ProfileLists.tsx";

// import UserSearch

import Messages from "./pages/Messaging/Messages.tsx";
import EventEdit from "./pages/Events/EventEdit.tsx";
// import Conversation

import Page404 from "./pages/Page404.tsx";
import TermsAndConditions from "./pages/Legal/Terms.tsx";
import PrivacyPolicy from "./pages/Legal/Privacy.tsx";
import CommunityGuidelines from "./pages/Legal/Community.tsx";

// Routes
const router = createBrowserRouter([
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{
				path: "/",
				element: <HomePage />,
			},
			{
				path: "/events",
				element: (
					<ProtectedRoute>
						<EventsLists />
					</ProtectedRoute>
				),
			},
			{
				path: "/events/:id",
				element: (
					<ProtectedRoute>
						<EventDetail />
					</ProtectedRoute>
				),
			},
			{
				path: "/event/create",
				element: (
					<ProtectedRoute>
						<EventCreate />
					</ProtectedRoute>
				),
			},
			{
				path: "/event/:id/edit",
				element: (
					<ProtectedRoute>
						<EventEdit />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile",
				element: (
					<ProtectedRoute>
						<ProfilesLists />
					</ProtectedRoute>
				),
			},
			{
				path: "/profile/:id",
				element: (
					<ProtectedRoute>
						<ProfileDetail />
					</ProtectedRoute>
				),
			},
			{
				path: "/account",
				element: (
					<ProtectedRoute>
						<ProfileEdit />
					</ProtectedRoute>
				),
			},
			{
				path: "/messages",
				element: <Messages />,
			},
			{
				path: "/terms",
				element: <TermsAndConditions />,
			},
			{
				path: "/community",
				element: <CommunityGuidelines />,
			},
			{
				path: "/privacy",
				element: <PrivacyPolicy />,
			},
			{
				path: "*",
				element: <Page404 />,
			},
		],
		errorElement: <Page404 />,
	},
]);

export default router;
