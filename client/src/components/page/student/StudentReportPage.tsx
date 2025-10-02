import { StudentReportTable } from "@/components/page/student/component/student-report-table.tsx";

export default function StudentReportPage() {
	const idStudent = "1212"
	return (
		<div className="space-y-6">
			<div className="space-y-2">
				<h1 className="text-3xl font-bold text-primary">Laporan Nilai</h1>
				<p className="text-muted-foreground">Berikut adalah laporan nilai Anda selama semester ini.</p>
			</div>
			<StudentReportTable idStudent={ idStudent } />
		</div>
	)
}
