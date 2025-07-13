import { createBrowserRouter } from "react-router";
import { Layout, } from "@/pages/App.tsx";
import { SoalPage } from "@/pages/SoalPage.tsx";
import { SoalList } from "@/pages/SoalList.tsx";
import { SoalCreate } from "@/pages/SoalCreate.tsx";
import { Home } from "@/pages/home.tsx";
import { Loading } from "@/components/loading.tsx";
import {
	createSoalAction,
	createSoalListAction,
	getSoalAll,
	soalListAnswer,
	soalListCheckLoader,
	soalListLoader
} from "@/action/soal.ts";
import { SoalAnswer } from "@/pages/soalAnswer.tsx";
import { AnswerCheck } from "@/pages/soalCheck.tsx";
import { ErrorBoundary } from "@/pages/reviewsError.tsx";

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || "http://localhost:3000"

export const router =
	createBrowserRouter([
		{
			Component: Layout,
			hydrateFallbackElement: <Loading />,
			children: [
				{ index: true, Component: Home },
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
