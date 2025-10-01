import { AcademicTable, exampleAcademicClasses } from "@/components/page/academic/components/academic-class-table.tsx";

export default function AcademicClassesPage() {
	return (
		<div className={ "space-y-6" }>
			<AcademicTable academicClass={ exampleAcademicClasses } />
		</div>
	);
}
