import { ClassesScheduleCards } from "@/components/page/academic/components/classes-schedule-cards.tsx";
import { TeacherProfile } from "@/components/page/teacher/components/teacher-profile.tsx";
import { StudentTabel } from "@/components/page/student/component/student-tabel.tsx";
import { AcademicClassStatisticCards } from "@/components/page/academic/components/classes-statistic.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";

export default function AcademicGradeClassDetailPage() {
	const data = {
		idTeacher: "asd",
		idClass: "asd",
	}
	return ( <>
			<Tabs defaultValue="schedule">
				<TabsList>
					<TabsTrigger value="schedule">Schedule</TabsTrigger>
					<TabsTrigger value="detail">Detail</TabsTrigger>
				</TabsList>
				<TabsContent value="schedule">
					{/*<StudentScheduleTable />*/ }
				</TabsContent>
				<TabsContent value="detail">
					<div className={ "space-y-6" }>
						<AcademicClassStatisticCards idClass={ data.idClass } />
						<TeacherProfile idTeacher={ data.idTeacher } />
						<ClassesScheduleCards idClass={ data.idClass } />
						<StudentTabel idClass={ data.idClass } />
					</div>
				</TabsContent>
			</Tabs>
		</>
	);
}
