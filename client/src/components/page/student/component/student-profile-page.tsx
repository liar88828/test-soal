import { useLoaderData } from "react-router-dom";
import { studentProfileLoader } from "@/action/student.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { StudentProfileReport } from "@/components/page/student/component/student-profile-report.tsx";
import { StudentProfileCard } from "@/components/page/student/component/student-profile-card.tsx";
import { StudentRecapGradesWeek } from "@/components/page/student/component/student-recap-grades-week.tsx";
import { ClassesScheduleCards } from "@/components/page/academic/components/classes-schedule-cards.tsx";

export default function StudentProfilePage() {
	const { user } = useLoaderData<typeof studentProfileLoader>()

	return (
		<div className="space-y-6">
			{/* Header */ }
			<div className=" space-y-2">
				<h1 className="text-3xl font-bold text-primary">Profil Siswa</h1>
				<p className="text-muted-foreground text-sm">
					Detail informasi akademik dan pribadi siswa
				</p>
			</div>

			<Tabs defaultValue="profile">
				<TabsList>
					<TabsTrigger value="profile">Profile</TabsTrigger>
					<TabsTrigger value="nilai-raport">Report</TabsTrigger>
					<TabsTrigger value="nilai-leasson">Lesson</TabsTrigger>
					<TabsTrigger value="schedule">Schedule</TabsTrigger>
					<TabsTrigger value="all">All</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<StudentProfileCard user={ user } />
				</TabsContent>
				<TabsContent value="nilai-raport">
					<StudentProfileReport idStudent={ user.id } />
				</TabsContent>
				<TabsContent value="nilai-leasson">
					<StudentRecapGradesWeek idStudent={ user.id } />
				</TabsContent>
				<TabsContent value="schedule">
					<ClassesScheduleCards idClass={ user.kelas } />
				</TabsContent>
				<TabsContent value="all">
					<div className="space-y-6">
						<StudentProfileCard user={ user } />
						<StudentProfileReport idStudent={ user.id } />
						<ClassesScheduleCards idClass={ user.kelas } />
						<StudentRecapGradesWeek idStudent={ user.id } />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
