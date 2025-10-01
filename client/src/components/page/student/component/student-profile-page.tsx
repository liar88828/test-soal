import { useLoaderData } from "react-router-dom";
import { studentProfileLoader } from "@/action/student.ts";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { exampleTableWeek, WeekGradesWeek } from "@/components/page/student/component/student-profile.tsx";
import { exampleNilai, StudentProfileReport } from "@/components/page/student/component/student-profile-report.tsx";
import { StudentProfileCard } from "@/components/page/student/component/student-profile-card.tsx";

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
					<TabsTrigger value="all">All</TabsTrigger>
				</TabsList>
				<TabsContent value="profile">
					<StudentProfileCard user={ user } />
				</TabsContent>
				<TabsContent value="nilai-raport">
					<StudentProfileReport nilai={ exampleNilai } />
				</TabsContent>
				<TabsContent value="nilai-leasson">
					<WeekGradesWeek weekSchedule={ exampleTableWeek } />
				</TabsContent>
				<TabsContent value="all">
					<div className="space-y-6">
						<StudentProfileCard user={ user } />
						<StudentProfileReport nilai={ exampleNilai } />
						<WeekGradesWeek weekSchedule={ exampleTableWeek } />
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
