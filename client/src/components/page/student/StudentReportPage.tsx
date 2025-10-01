import { exampleReports } from "@/assets/example/exampleReports.ts";
import { StudentReportTable } from "@/components/page/student/component/student-report-table.tsx";

export default function StudentReportPage() {
	return (
		<div className="space-y-6">
			<div className="max-w-4xl mx-auto space-y-6">
				<h1 className="text-3xl font-bold text-primary">Laporan Nilai</h1>
				<p className="text-muted-foreground">Berikut adalah laporan nilai Anda selama semester ini.</p>
			</div>
			<StudentReportTable reports={ exampleReports } />
		</div>
	)
}
