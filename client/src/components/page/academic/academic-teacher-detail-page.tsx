import { AcademicTeacherDetailProfile, exampleTeacher } from "@/components/page/teacher/components/teacher-profile.tsx";
import { exampleSubject, TeacherSubjectsTable } from "@/components/page/academic/components/teacher-subjects-table.tsx";

export default function AcademicTeacherDetailPage() {
	return (
		<div className="space-y-4">
			<AcademicTeacherDetailProfile teacher={ exampleTeacher } />
			<TeacherSubjectsTable subjects={ exampleSubject } />
		</div>
	);
}
