import { createBrowserRouter } from "react-router";
import { SoalPage } from "./pages/SoalPage.tsx";
import { SoalListPage } from "./pages/SoalListPage.tsx";
import { SoalCreate } from "./pages/SoalCreate.tsx";
import HomePage from "./pages/homePage.tsx";
import { Loading } from "./components/loading.tsx";
import {
	createSoalAction,
	createSoalListAction,
	getSoalAll,
	soalListAnswerAction,
	soalListCheckLoader,
	soalListLoader
} from "./action/soal.action.ts";
import { profileLoader, registerAction, layoutLoader, homeLoader, loginAction, logoutAction, sessionLoader, } from "./action/auth.action.ts";
import { SoalAnswerPage } from "./pages/soalAnswer.tsx";
import { ErrorBoundary } from "./pages/reviewsError.tsx";
import { AnswerCheck } from "./pages/soalCheck.tsx";
import RegisterPage from "./pages/registerPage.tsx";
import LoginPage from "./pages/loginPage.tsx";
import { Layout } from "./pages/Layout.tsx";
import ProfilePage from "./pages/ProfilePage.tsx";
import LogoutPage from "./pages/logoutPage.tsx";

export const routerClient =
	createBrowserRouter([
		{
			loader: layoutLoader,
			Component: Layout,
			hydrateFallbackElement: <Loading />,
			children: [
				{
					index: true,
					loader: homeLoader,
					Component: HomePage
				},

				{
					path: "login",
					Component: LoginPage,
					action: loginAction
				},

				{
					path: "register",
					Component: RegisterPage,
					action: registerAction
				},
				{
					path: "profile",
					Component: ProfilePage,
					loader: profileLoader
				},
				{
					path: "logout",
					Component: LogoutPage,
					action: logoutAction,

				},

				{
					path: "soal",
					children: [
						{
							index: true,
							Component: SoalPage,
							loader: getSoalAll,
						},
						{
							path: 'create',
							Component: SoalCreate,
							loader: sessionLoader,
							action: createSoalAction,
						},

						{
							path: ':id',
							Component: SoalListPage,
							loader: soalListLoader,
							action: createSoalListAction,
						},

						{
							path: ':id/answer',
							Component: SoalAnswerPage,
							loader: soalListLoader,
							action: soalListAnswerAction,
						},
						{
							path: ":id/check",
							Component: AnswerCheck,
							loader: soalListCheckLoader, // baru
							errorElement: <ErrorBoundary />,
						}
					],
				},

			]
		},
	]);
