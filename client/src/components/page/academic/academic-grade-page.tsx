import { AcademicGradeTable, exampleAcademicClasses } from "@/components/page/academic/components/academic-grade-table.tsx";

export default function AcademicGradePage() {
	return (
		<div className={ "space-y-6" }>
			<AcademicGradeTable academicClass={ exampleAcademicClasses } />
		</div>
	);
}
