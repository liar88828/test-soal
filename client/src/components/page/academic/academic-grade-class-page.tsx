import AcademicGradeClassesTabelPage from "@/components/page/academic/components/academic-grade-classes-tabel.tsx";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs.tsx";
import { JadwalSekolah } from "@/components/page/academic/jadwal-sekolah.tsx";
import { AcademicGradeTeacher } from "@/components/page/academic/components/academic-grade-teacher.tsx";
import { useParams } from "react-router-dom";
import { AcademicGradeOption } from "@/components/page/academic/components/academic-grade-option.tsx";

export default function AcademicGradeClassPage() {
	const params = useParams<{ id: string }>();
	return (
		<div className="space-y-6">
			<div className="space-y-6">
				<Tabs defaultValue="Class">
					<TabsList>
						<TabsTrigger value="Class">Classes</TabsTrigger>
						<TabsTrigger value="Teacher">Teachers</TabsTrigger>
						<TabsTrigger value="Option">Option</TabsTrigger>
						<TabsTrigger value="Schedule">Schedule</TabsTrigger>
						<TabsTrigger value="Schedule-2">Schedule</TabsTrigger>
					</TabsList>
					<TabsContent value="Class">
						<AcademicGradeClassesTabelPage />
					</TabsContent>
					<TabsContent value="Teacher">
						<AcademicGradeTeacher idGrade={ params.id ?? "" } />
					</TabsContent>
					<TabsContent value="Option">
						<AcademicGradeOption idGrade={ params.id ?? "" } />
					</TabsContent>
					<TabsContent value="Schedule">
						<JadwalSekolah />
					</TabsContent>
					<TabsContent value="Schedule-2">
						<JadwalSekolah />
					</TabsContent>
				</Tabs>
			</div>
		</div>
	);
}
