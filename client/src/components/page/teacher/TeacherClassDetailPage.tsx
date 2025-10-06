import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ClassAttendanceTable } from "@/components/page/teacher/ClassAttendanceTable.tsx";
import { useParams } from "react-router-dom";
import { StudentTabel } from "@/components/page/teacher/components/StudentTabel.tsx";

export default function TeacherClassDetailPage() {
	const params = useParams<{ id: string }>()

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
					<StudentTabel idClass={ params.id } />
				</TabsContent>
				<TabsContent value="input-nilai">
					<ClassAttendanceTable idClass={ params.id } />
				</TabsContent>
			</Tabs>
		</div>
	)
}
