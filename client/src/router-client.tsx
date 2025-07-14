import { createBrowserRouter } from "react-router";

import { SoalPage } from "./pages/SoalPage.tsx";
import { SoalList } from "./pages/SoalList.tsx";
import { SoalCreate } from "./pages/SoalCreate.tsx";
import Home from "./pages/home.tsx";
import { Loading } from "./components/loading.tsx";
import {
	createSoalAction,
	createSoalListAction,
	getSoalAll,
	soalListAnswer,
	soalListCheckLoader,
	soalListLoader
} from "./action/soal.ts";
import { SoalAnswer } from "./pages/soalAnswer.tsx";
import { ErrorBoundary } from "./pages/reviewsError.tsx";
import { AnswerCheck } from "./pages/soalCheck";
import RegisterPage from "./pages/registerPage.tsx";
import LoginPage from "./pages/loginPage.tsx";
import { homeLoader, loginAction, profileLoader, registerAction } from "@/action/auth.action.ts";
import { Layout } from "@/pages/App.tsx";
import ProfilePage from "@/pages/ProfilePage.tsx";

export const routerClient =
	createBrowserRouter([
		{
			Component: Layout,
			hydrateFallbackElement: <Loading />,
			children: [
				{
					index: true,
					loader: homeLoader,
					Component: Home
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
							action: createSoalAction,
						},

						{
							path: ':id',
							Component: SoalList,
							loader: soalListLoader,
							action: createSoalListAction,
						},

						{
							path: ':id/answer',
							Component: SoalAnswer,
							loader: soalListLoader,
							action: soalListAnswer,
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
