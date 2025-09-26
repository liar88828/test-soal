import { createBrowserRouter, redirect } from 'react-router'
import { SoalPage } from './pages/question/SoalPage.tsx'
import { SoalCreateList } from './pages/question/SoalCreateList.tsx'
import { SoalCreateModal } from './pages/question/SoalCreateModal.tsx'
import { Loading } from './components/mini/loading.tsx'
import { createSoalABCAction, createSoalAction, createSoalTextAction, getSoalAll, soalListAnswer, soalListCheckLoader, soalListLoader, } from './action/soal.ts'
import Home from './pages/auth/home.tsx'
import { ErrorBoundary } from './pages/question/reviewsError.tsx'
import AnswerCheck from './pages/question/soalCheck.tsx'
import SoalAnswer from './pages/question/soalAnswer.tsx'
import RegisterPage from './pages/auth/registerPage.tsx'
import LoginPage from './pages/auth/loginPage.tsx'
import { appLoader, AuthLoader, homeLoader, loginAction, logoutAction, profileLoader, registerAction, } from '@/action/auth.action.ts'
import ProfilePage from '@/components/ProfilePage.tsx'
import { studentHomeLoader, studentProfileLoader } from './action/student.ts'
import StudentProfile from './pages/student/StudentProfile.tsx'
import StudentHome from './pages/student/StudentHome.tsx'
import { isProtectedRoute } from './action/session.ts'
import AppLayout from './pages/AppLayout.tsx'
import StudentSchedule from './pages/student/StudentSchedule.tsx'
import StudentAnnouncements from './pages/student/StudentAnnouncements.tsx'
import TeacherHome from './pages/teacher/TeacherHome.tsx'
import TeacherClasses from './pages/teacher/TeacherClasses.tsx'
import TeacherClassDetail from './pages/teacher/TeacherClassDetail.tsx'
import TeacherGrades from './pages/teacher/TeacherGrades.tsx'
import TeacherAnnouncements from './pages/teacher/TeacherAnnouncements.tsx'
import TeacherSchedule from './pages/teacher/TeacherSchedule.tsx'
import StudentReport from './pages/student/StudentReport .tsx'
import TeacherStudentPage from './pages/teacher/TeacherStudentPage.tsx'
import TeacherAbsencePage from './pages/teacher/TeacherAbsencePage.tsx'
import FinanceHome from './pages/finance/FinanceHome.tsx'
import FinancePayments from './pages/finance/FinancePayments.tsx'
import FinanceReports from './pages/finance/FinanceReports.tsx'
import FinanceBills from './pages/finance/FinanceBills.tsx'
import FinanceCash from './pages/finance/FinanceCash.tsx'
import FinanceClasses from './pages/finance/FinanceClasses.tsx'
import FinanceSubjects from './pages/finance/FinanceSubjects.tsx'
import FinanceRoom from './pages/finance/FinanceRoom.tsx'
import LogoutPage from "@/pages/auth/logoutPage.tsx";
import { SoalABCComponent } from "@/pages/question/SoalABCComponent.tsx";
import { SoalTextComponent } from "@/pages/question/SoalTextComponent.tsx";

export const routerClient = createBrowserRouter([
	{
		Component: AppLayout,
		loader: appLoader,
		hydrateFallbackElement: <Loading />,
		children: [
			{
				index: true,
				loader: homeLoader,
				Component: Home,
			},
			//--------- auth
			{
				path: 'auth',
				children: [
					{
						path: 'login',
						Component: LoginPage,
						action: loginAction,
						loader: AuthLoader,
					},
					{
						path: 'register',
						Component: RegisterPage,
						action: registerAction,
						loader: AuthLoader,
					},
					{
						path: 'logout',
						Component: LogoutPage,
						action: logoutAction,
					},

					{
						path: 'profile',
						Component: ProfilePage,
						loader: profileLoader,
					},
				],
			},

			//------- student
			{
				path: 'student',
				loader: () => {
					if (isProtectedRoute('USER')) {
						return redirect('/auth/login')
					}
					// redirect('/student/profile')
				},
				children: [
					{
						index: true,
						Component: StudentHome,
						loader: studentHomeLoader,
					},
					{
						path: 'profile',
						Component: StudentProfile,
						loader: studentProfileLoader,
					},
					{
						path: 'schedule',
						Component: StudentSchedule,
						loader: studentProfileLoader,
					},
					{
						path: 'announcements',
						Component: StudentAnnouncements,
						loader: studentProfileLoader,
					},
					{
						path: 'report',
						Component: StudentReport,
						action: createSoalAction,
					},
				],
			},

			//------- teacher
			{
				path: 'teacher',
				children: [
					{
						index: true,
						Component: TeacherHome,
						loader: getSoalAll,
					},
					{
						path: 'classes',
						Component: TeacherClasses,
						action: createSoalAction,
					},
					{
						path: 'classes/:id',
						Component: TeacherClassDetail,
						action: createSoalAction,
					},
					{
						path: 'grades',
						Component: TeacherGrades,
						action: createSoalAction,
					},
					{
						path: 'announcements',
						Component: TeacherAnnouncements,
						action: createSoalAction,
					},
					{
						path: 'schedule',
						Component: TeacherSchedule,
						// loader: soalListLoader,
						// action: createSoalABCAction,
					},

					{
						path: 'student',
						Component: TeacherStudentPage,
						// loader: soalListLoader,
						// action: soalListAnswer,
					},
					{
						path: 'absence',
						Component: TeacherAbsencePage,
						// loader: soalListLoader,
						// action: soalListAnswer,
					},
				],
			},

			//------- finance
			{
				path: 'finance',
				children: [
					{
						index: true,
						Component: FinanceHome,
					},
					{
						path: 'payments',
						Component: FinancePayments,
					},
					{
						path: 'report',
						Component: FinanceReports,
					},
					{
						path: 'bills',
						Component: FinanceBills,
					},
					{
						path: 'cash',
						Component: FinanceCash,
					},
					{
						path: 'classes',
						Component: FinanceClasses,
					},
					{
						path: 'subjects',
						Component: FinanceSubjects,
					},
					{
						path: 'room',
						Component: FinanceRoom,
					},
				],
			},

			// question
			{
				path: 'soal',
				children: [
					{
						index: true,
						Component: SoalPage,
						loader: getSoalAll,
					},
					{
						path: 'create',
						Component: SoalCreateModal,
						action: createSoalAction,
					},
					{
						path: ':id',
						Component: SoalCreateList,
						loader: soalListLoader,
						// action: createSoalABCAction,
					},
					{
						path: ':id/question-abc',
						Component: SoalABCComponent,
						loader: soalListLoader,
						action: createSoalABCAction,
					},
					{
						path: ':id/question-text',
						Component: SoalTextComponent,
						loader: soalListLoader,
						action: createSoalTextAction,
					},


					{
						path: ':id/answer',
						Component: SoalAnswer,
						loader: soalListLoader,
						action: soalListAnswer,
					},
					{
						path: ':id/check',
						Component: AnswerCheck,
						loader: soalListCheckLoader, // baru
						errorElement: <ErrorBoundary />,
					},
				],
			},
			// ---
		],
	},
])
