import { AcademicTeacher, teachers } from "@/components/page/academic/components/academic-teacher.tsx";

export default function AcademicTeacherPage() {
	return (
		<div className="space-y-6">
			<AcademicTeacher teachers={ teachers } />
		</div>
	);
}
