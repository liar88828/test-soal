import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link, useParams } from "react-router-dom";
import { Eye } from "lucide-react";
import { TableLoading } from "@/components/mini/TableComponent.tsx";
import { useAcademicClassesDetailTabel } from "@/lib/swr/use-academic.ts";
import { ClassRow } from "@/interface/class-row.ts";
import { AcademicGradeOptionTable } from "@/components/page/academic/components/academic-grade-teacher-2.tsx";


export function AcademicGradeClassesTabel(props: { idGrade: string }) {
	const { data: classes } = useAcademicClassesDetailTabel(props.idGrade)

	const handleEdit = (row: ClassRow) => {
		console.log("Edit", row);
		// open modal or navigate to edit page
	};

	const handleDelete = (row: ClassRow) => {
		console.log("Delete", row);
		// remove from data or call API
	};

	return (
		<Card>
			<CardHeader>
				<CardTitle className={ "capitalize" }>Daftar Kelas { props.idGrade }</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>Level</TableHead>
							<TableHead>Class</TableHead>
							<TableHead>Section</TableHead>
							<TableHead>Teacher</TableHead>
							<TableHead>Students</TableHead>
							<TableHead>Room</TableHead>
							<TableHead>Schedule</TableHead>
							<TableHead>Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>

						{
							!classes
								? <TableLoading spanCol={ 8 } />
								: classes.map((row) => (
									<TableRow key={ `${ row.level }-${ row.titleName }-${ row.section }` }>
										<TableCell>{ row.level }</TableCell>
										<TableCell>{ row.titleName }</TableCell>
										<TableCell>{ row.section }</TableCell>
										<TableCell>{ row.teacher }</TableCell>
										<TableCell>{ row.students }</TableCell>
										<TableCell>{ row.room }</TableCell>
										<TableCell>{ row.schedule }</TableCell>
										<TableCell className="flex gap-2">
											<Button size="sm" variant="outline" onClick={ () => handleEdit(row) }>
												<Link to={ `/academic/classes/${ row.section }/schedule` }> <Eye /></Link>
											</Button>
											<Button size="sm" variant="outline" onClick={ () => handleEdit(row) }>
												Edit
											</Button>
											<Button size="sm" variant="destructive" onClick={ () => handleDelete(row) }>
												Delete
											</Button>
										</TableCell>
									</TableRow>
								)) }
					</TableBody>
				</Table>
			</CardContent>
		</Card>
	);
}

export default function AcademicGradeClassesTabelPage() {
	const params = useParams<{ id: string }>();

	return (
		<div className={ "space-y-6" }>
			<AcademicGradeClassesTabel idGrade={ params.id ?? "" } />
			<AcademicGradeOptionTable idGrade={ params.id ?? "" } />
		</div>
	);
}
