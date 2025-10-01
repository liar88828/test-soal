import { ClassesScheduleCards, exampleSchedule } from "@/components/page/academic/components/classes-schedule-cards.tsx";
import { AcademicTeacherDetailProfile, exampleTeacher } from "@/components/page/teacher/components/teacher-profile.tsx";
import { exampleSiswaList } from "@/assets/example/siswaList.ts";
import { StudentTabel } from "@/components/page/student/component/student-tabel.tsx";
import { ClassStatisticCards, exampleClassesStatistic } from "@/components/page/academic/classes-statistic.tsx";

export default function AcademicClassesDetailSchedulePage() {
	return ( <>
			{/*<Tabs defaultValue="teacher">*/ }
			{/*	<TabsList>*/ }
			{/*		<TabsTrigger value="teacher">Teacher</TabsTrigger>*/ }
			{/*		<TabsTrigger value="schedule">Schedule</TabsTrigger>*/ }
			{/*		<TabsTrigger value="siswa">Student</TabsTrigger>*/ }
			{/*		<TabsTrigger value="all">All</TabsTrigger>*/ }
			{/*	</TabsList>*/ }
			{/*	<TabsContent value="teacher"><AcademicTeacherDetailProfile teacher={ exampleTeacher } /></TabsContent>*/ }
			{/*	<TabsContent value="schedule"> <ClassesScheduleCards schedule={ exampleSchedule } /></TabsContent>*/ }
			{/*	<TabsContent value="siswa"> <StudentTabel siswas={ exampleSiswaList } /></TabsContent>*/ }
			{/*	<TabsContent value="all">*/ }
			<div className={ "space-y-6" }>
				<ClassStatisticCards classData={ exampleClassesStatistic } />
				<AcademicTeacherDetailProfile teacher={ exampleTeacher } />
				<ClassesScheduleCards schedule={ exampleSchedule } />
				<StudentTabel siswas={ exampleSiswaList } />
			</div>
			{/*	</TabsContent>*/ }
			{/*</Tabs>*/ }
		</>
	);
}
