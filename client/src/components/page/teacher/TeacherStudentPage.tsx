import { exampleSiswaList } from "@/assets/example/siswaList.ts";
import { StudentTabel } from "@/components/page/student/component/student-tabel.tsx";

export default function TeacherStudentPage() {
	return (
		<div className="space-y-6">
			<div className="space-y-4">
				<h1 className="text-3xl font-bold text-primary">Daftar Siswa</h1>
				<p className="text-muted-foreground">
					Berikut adalah daftar siswa yang Anda ajar.
				</p>
			</div>
			<StudentTabel siswas={ exampleSiswaList } />
		</div>
	)
}
