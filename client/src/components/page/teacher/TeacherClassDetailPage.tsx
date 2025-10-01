import { exampleSiswaList } from "@/assets/example/siswaList.ts";
import { StudentTabel } from "@/components/page/student/component/student-tabel.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassAttendanceTable, exampleWeeks } from "@/components/page/teacher/ClassAttendanceTable.tsx";

export default function TeacherClassDetailPage() {
	return (
		<div className=" space-y-6">
			<div className="">
				<h1 className="text-3xl font-bold text-primary">Detail Kelas: X IPA 1</h1>
				<p className="text-muted-foreground">Daftar siswa dalam kelas ini:</p>
			</div>
			<Tabs defaultValue="semua-siswa">
				<TabsList>
					<TabsTrigger value="semua-siswa">Semua Siswa</TabsTrigger>
					<TabsTrigger value="input-nilai">Input Nilai</TabsTrigger>
				</TabsList>
				<TabsContent value="semua-siswa">
					<StudentTabel siswas={ exampleSiswaList } />
				</TabsContent>
				<TabsContent value="input-nilai">
					<ClassAttendanceTable weekClass={ exampleWeeks } />
				</TabsContent>
			</Tabs>
		</div>
	)
}
