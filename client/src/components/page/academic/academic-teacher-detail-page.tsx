import { useParams } from "react-router-dom";
import TeacherSubjectsTable from "@/components/page/teacher/components/teacher-subjects-table.tsx";
import TeacherProfile from "@/components/page/teacher/components/teacher-profile.tsx";

export default function AcademicTeacherDetailPage() {
	const params = useParams<{ id: string }>()
	if (!params.id) {
		return null
	}
	return (
		<div className="space-y-4">
			<TeacherProfile idTeacher={ params.id } />
			<TeacherSubjectsTable idTeacher={ params.id } />
		</div>
	);
}
