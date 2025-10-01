import { AcademicClassesDetailTabel, exampleClass } from "@/components/page/academic/components/AcademicClassesDetailTabel.tsx";

export default function AcademicClassesDetailPage() {
	return (
		<div className="space-y-6">
			<AcademicClassesDetailTabel classData={ exampleClass } />
		</div>
	);
}
