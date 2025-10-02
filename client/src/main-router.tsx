import { createBrowserRouter } from "react-router"
import { SoalPage } from "@/components/page/question/SoalPage.tsx"
import { SoalCreateList } from "@/components/page/question/SoalCreateList.tsx"
import { SoalCreateModal } from "@/components/page/question/SoalCreateModal.tsx"
import { Loading } from "./components/mini/loading.tsx"
import { createSoalABCAction, createSoalAction, createSoalTextAction, getSoalAll, soalListAnswer, soalListCheckLoader, soalListLoader, } from "./action/soal.ts"
import { AuthLoader, loginAction, logoutAction, profileLoader, registerAction, sessionLoader, } from "@/action/auth.action.ts"
import { studentDetailProfileLoader, studentHomeLoader, studentProfileLoader } from "./action/student.ts"
import Home from "@/components/page/auth/home.tsx"
import AnswerCheck from "@/components/page/question/soalCheck.tsx"
import SoalAnswer from "@/components/page/question/soalAnswer.tsx"
import RegisterPage from "@/components/page/auth/registerPage.tsx"
import LoginPage from "@/components/page/auth/loginPage.tsx"
import ProfilePage from "@/components/page/auth/ProfilePage.tsx"
import StudentHome from "@/components/page/student/StudentHome.tsx"
import { ProtectLayout, PublicLayout } from "./components/page/root/AppLayout.tsx"
import StudentAnnouncementsPage from "@/components/page/student/StudentAnnouncementsPage.tsx"
import TeacherHome from "@/components/page/teacher/TeacherHome.tsx"
import TeacherClassesPage from "@/components/page/teacher/TeacherClassesPage.tsx"
import TeacherClassDetailPage from "@/components/page/teacher/TeacherClassDetailPage.tsx"
import TeacherGrades from "@/components/page/teacher/TeacherGrades.tsx"
import AnnouncementPage from "@/components/page/announcements/announcement-page.tsx"
import TeacherScheduleCard from "@/components/page/schedule/teacher-schedule-card.tsx"
import TeacherStudentPage from "@/components/page/teacher/TeacherStudentPage.tsx"
import TeacherAbsencePage from "@/components/page/absence/teacher-absence-page.tsx"
import FinanceHome from "@/components/page/finance/FinanceHome.tsx"
import FinancePayments from "@/components/page/finance/FinancePayments.tsx"
import FinanceReports from "@/components/page/finance/FinanceReports.tsx"
import FinanceBills from "@/components/page/finance/FinanceBills.tsx"
import FinanceCash from "@/components/page/finance/FinanceCash.tsx"
import FinanceClasses from "@/components/page/finance/FinanceClasses.tsx"
import FinanceSubjects from "@/components/page/finance/FinanceSubjects.tsx"
import FinanceRoom from "@/components/page/finance/FinanceRoom.tsx"
import LogoutPage from "@/components/page/auth/logoutPage.tsx";
import { SoalABCComponent } from "@/components/page/question/SoalABCComponent.tsx";
import { SoalTextComponent } from "@/components/page/question/SoalTextComponent.tsx";
import { ErrorBoundary } from "@/components/page/root/ErrorBoundary.tsx";
import { announcementDetailAction, announcementDetailLoader, announcementPageAction, announcementPageLoader } from "@/action/announcement.ts";
import AcademicGradeClassPage from "@/components/page/academic/academic-grade-class-page.tsx";
import AcademicGradeClassDetailPage from "@/components/page/academic/academic-grade-class-detail-page.tsx";
import AcademicTeacherPage from "@/components/page/academic/academic-teacher-page.tsx";
import AcademicTeacherDetailPage from "@/components/page/academic/academic-teacher-detail-page.tsx";
import { publicMiddleware, testMiddleware, validMiddleware } from "@/action/session.middleware.ts";
import { AcademicSchedulePage } from "@/components/page/academic/academic-schedule-page.tsx";
import AcademicGradePage from "@/components/page/academic/academic-grade-page.tsx";
import AcademicScheduleOptionPage from "@/components/page/academic/academic-schedule-option-page.tsx";
import StudentProfile from "@/components/page/student/component/student-profile-page.tsx";
import StudentProfilePage from "@/components/page/student/component/student-profile-page.tsx";
import AnnouncementDetailPage from "@/components/page/announcements/announcement-detail-page.tsx";
import { AnnouncementIndex } from "@/components/page/announcements/announcement-index.tsx";
// main-router
export const mainRouter = createBrowserRouter(
	[
		{

			errorElement: <ErrorBoundary />,
			hydrateFallbackElement: <Loading />,
			// Component: AppLayout,
			// loader: sessionLoader,
			children: [
				{
					middleware: [ publicMiddleware ],
					loader: sessionLoader,
					Component: PublicLayout,
					children: [
						{
							index: true,
							Component: Home,
						},
						//--------- auth
						{
							middleware: [ testMiddleware ],
							path: "auth",
							children: [
								{
									path: "login",
									Component: LoginPage,
									action: loginAction,
									loader: AuthLoader,
								},
								{
									path: "register",
									Component: RegisterPage,
									action: registerAction,
									loader: AuthLoader,
								},
								{
									path: "logout",
									Component: LogoutPage,
									action: logoutAction,
								},

								{
									path: "profile",
									Component: ProfilePage,
									loader: profileLoader,
								},
							],
						},

					]
				},

				{
					// loader: protectLoader,
					middleware: [ validMiddleware ],
					loader: sessionLoader,
					Component: ProtectLayout,
					children: [
						{
							path: "academic",
							children: [
								{
									index: true,
									Component: AcademicSchedulePage,
								},
								{
									path: "schedule",
									Component: AcademicScheduleOptionPage,
								},
								{
									path: "classes",
									Component: AcademicGradePage,
								},
								{
									path: "classes/:id",
									Component: AcademicGradeClassPage,
								},

								{
									path: "classes/:id/schedule",
									Component: AcademicGradeClassDetailPage,
								},
								{
									path: "teacher",
									Component: AcademicTeacherPage,
								},
								{
									path: "teacher/:id",
									Component: AcademicTeacherDetailPage,
								},
							]
						},
						//------- student
						{
							// loader: () => {
							// 	if (isProtectedRoute('USER')) {
							// 		return redirect('/auth/login')
							// 	}
							// 	// redirect('/student/profile')
							// },
							path: "student",
							children: [
								{
									index: true,
									Component: StudentHome,
									loader: studentHomeLoader,
								},
								{
									path: ":nis",
									Component: StudentProfile,
									loader: studentDetailProfileLoader,
								},
								{
									path: "profile",
									Component: StudentProfilePage,
									loader: studentProfileLoader,
								},
								// {
								// 	path: "schedule",
								// 	Component: StudentSchedulePage,
								// 	loader: studentProfileLoader,
								// },
								{
									path: "announcements",
									Component: StudentAnnouncementsPage,
									loader: studentProfileLoader,
								},
								// {
								// 	path: "report",
								// 	Component: StudentReportPage,
								// 	action: createSoalAction,
								// },
							],
						},

						//------- teacher
						{
							path: "teacher",
							children: [
								{
									index: true,
									Component: TeacherHome,
									loader: getSoalAll,
								},
								{
									path: "classes",
									Component: TeacherClassesPage,
									action: createSoalAction,
								},
								{
									path: "classes/:id",
									Component: TeacherClassDetailPage,
									action: createSoalAction,
								}, {
									path: "classes/:id/input/:week",
									Component: TeacherGrades,
									action: createSoalAction,
								},
								// {
								// 	path: 'grades',
								// 	Component: TeacherGrades,
								// 	action: createSoalAction,
								// },
								{
									path: "announcements",
									Component: AnnouncementPage,
									action: createSoalAction,
								},
								{
									path: "schedule",
									Component: TeacherScheduleCard,
									// loader: soalListLoader,
									// action: createSoalABCAction,
								},
								{
									path: "schedule/:id",
									Component: TeacherGrades,
									// loader: soalListLoader,
									// action: createSoalABCAction,
								},

								{
									path: "student",
									Component: TeacherStudentPage,
									// loader: soalListLoader,
									// action: soalListAnswer,
								},
								{
									path: "absence",
									Component: TeacherAbsencePage,
									// loader: soalListLoader,
									// action: soalListAnswer,
								},
							],
						},

						//------- finance
						{
							path: "finance",
							children: [
								{
									index: true,
									Component: FinanceHome,
								},
								{
									path: "payments",
									Component: FinancePayments,
								},
								{
									path: "report",
									Component: FinanceReports,
								},
								{
									path: "bills",
									Component: FinanceBills,
								},
								{
									path: "cash",
									Component: FinanceCash,
								},
								{
									path: "classes",
									Component: FinanceClasses,
								},
								{
									path: "subjects",
									Component: FinanceSubjects,
								},
								{
									path: "room",
									Component: FinanceRoom,
								},
							],
						},

						//------- announcement
						{
							path: "announcement",
							children: [
								{
									index: true,
									Component: AnnouncementIndex,
									loader: announcementPageLoader,
									action: announcementPageAction
								},
								{
									path: ":id",
									Component: AnnouncementDetailPage,
									action: announcementDetailAction,
									loader: announcementDetailLoader
								},
								{
									path: "report",
									Component: FinanceReports,
								},
								{
									path: "bills",
									Component: FinanceBills,
								},
								{
									path: "cash",
									Component: FinanceCash,
								},
								{
									path: "classes",
									Component: FinanceClasses,
								},
								{
									path: "subjects",
									Component: FinanceSubjects,
								},
								{
									path: "room",
									Component: FinanceRoom,
								},
							],
						},

						// question
						{
							path: "soal",
							children: [
								{
									index: true,
									Component: SoalPage,
									loader: getSoalAll,
								},
								{
									path: "create",
									Component: SoalCreateModal,
									action: createSoalAction,
								},
								{
									path: ":id",
									Component: SoalCreateList,
									loader: soalListLoader,
									// action: createSoalABCAction,
								},
								{
									path: ":id/question-abc",
									Component: SoalABCComponent,
									loader: soalListLoader,
									action: createSoalABCAction,
								},
								{
									path: ":id/question-text",
									Component: SoalTextComponent,
									loader: soalListLoader,
									action: createSoalTextAction,
								},

								{
									path: ":id/answer",
									Component: SoalAnswer,
									loader: soalListLoader,
									action: soalListAnswer,
								},
								{
									path: ":id/check",
									Component: AnswerCheck,
									loader: soalListCheckLoader, // baru
								},
							],
						},
						// ---
					]
				},
			],
		},
	],
)
