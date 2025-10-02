import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { Link } from "react-router-dom";
import { Eye } from "lucide-react";
import { TeacherType } from "@/interface/teacher-type.ts";

type Teacher = Pick<TeacherType,
	"name" |
	"id" |
	"subject" |
	"phone" |
	"email"
>

export function AcademicTeacher({ teachers }: { teachers: Teacher[] }) {

	return (
		<Card className="w-full">
			<CardHeader>
				<CardTitle>List of Teachers</CardTitle>
			</CardHeader>
			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="w-[50px] text-center">ID</TableHead>
							<TableHead>Name</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>Phone</TableHead>
							<TableHead>Email</TableHead>
							<TableHead>Action</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ teachers.map((teacher) => (
							<TableRow key={ teacher.id }>
								<TableCell className="text-center">{ teacher.id }</TableCell>
								<TableCell>{ teacher.name }</TableCell>
								<TableCell>{ teacher.subject }</TableCell>
								<TableCell>{ teacher.phone }</TableCell>
								<TableCell>{ teacher.email }</TableCell>
								<TableCell>
									<Button asChild variant={ "outline" }>
										<Link to={ `/academic/teacher/${ teacher.id }` }>
											<Eye />
										</Link>
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
