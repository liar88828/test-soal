import AcademicGradeClassesTabelPage from "@/components/page/academic/components/academic-grade-classes-tabel.tsx";
import JadwalSekolahPage from "@/components/page/academic/jadwal-sekolah-page.tsx";
import AcademicGradeTeacher from "@/components/page/academic/components/academic-grade-teacher.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { useParams } from "react-router-dom";

export default function AcademicGradeClassPage() {
	const params = useParams<{ id: string }>();
	return (
		<div className="space-y-6">
			<div className="space-y-6">
				<Tabs defaultValue="Class">
					<TabsList>
						<TabsTrigger value="Class">Classes</TabsTrigger>
						<TabsTrigger value="Teacher">Teachers</TabsTrigger>
						<TabsTrigger value="Schedule">Schedule</TabsTrigger>
					</TabsList>
					<TabsContent value="Class">
						<AcademicGradeClassesTabelPage />
					</TabsContent>
					<TabsContent value="Teacher">
						<AcademicGradeTeacher idGrade={ params.id ?? "" } />
					</TabsContent>
					<TabsContent value="Schedule">
						<JadwalSekolahPage />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
