// Base levels
import { subjectSchema, SubjectSchema } from "@/components/page/academic/components/subject-schema.ts";
import { useSubjectStore } from "@/stores/subject-store.ts";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "@/components/ui/table.tsx";
import { Button } from "@/components/ui/button.tsx";
import { PencilIcon, TrashIcon } from "lucide-react";

import { AcademicTeacherDetailForm } from "@/components/page/academic/components/AcademicTeacherDetailForm.tsx";

export const exampleSubject = [
	{
		id: "1",
		className: "A2 Class 1",
		subjectName: "Math",
		day: "Mon",
		startTime: "08:00",
		endTime: "10:00",
		sks: 4,
	},
	{
		id: "2",
		className: "A2 Class 2",
		subjectName: "Math",
		day: "Tue",
		startTime: "09:00",
		endTime: "11:00",
		sks: 4,
	},
	{
		id: "3",
		className: "A2 Class 3",
		subjectName: "Math",
		day: "Wed",
		startTime: "10:00",
		endTime: "12:00",
		sks: 4,
	},

]

export function TeacherSubjectsTable({ subjects: subjectsProps }: { subjects: SubjectSchema[] }) {

	const { subjects, deleteSubject, setSubject } = useSubjectStore();
	const [ editing, setEditing ] = useState<SubjectSchema | null>(null);

	useEffect(() => {
		setSubject(subjectsProps);
	}, [ setSubject, subjectsProps ])

// helper to parse "HH:mm" into minutes
	function timeToMinutes(time: string) {
		const [ h, m ] = time.split(":").map(Number);
		return h * 60 + m;
	}

// get duration in minutes
	function getDuration(start: string, end: string) {
		return timeToMinutes(end) - timeToMinutes(start);
	}

// totals
	const totalSks = subjects.reduce((sum, item) => sum + item.sks, 0);

	const totalMinutes = subjects.reduce(
		(sum, item) => sum + getDuration(item.startTime, item.endTime),
		0
	);

	const hours = Math.floor(totalMinutes / 60);
	const minutes = totalMinutes % 60;
	const form = useForm<SubjectSchema>({
		resolver: zodResolver(subjectSchema),
		defaultValues: { className: "", subjectName: "", day: "", sks: 2 },
	});
	return (
		<Card>
			<CardHeader className="flex flex-row items-center justify-between">
				<CardTitle>Subjects Taught</CardTitle>
				<AcademicTeacherDetailForm
					form={ form }
					editing={ editing } setEditing={ setEditing }
				/>
			</CardHeader>

			<CardContent>
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead>No</TableHead>
							<TableHead>Class</TableHead>
							<TableHead>Subject</TableHead>
							<TableHead>SKS</TableHead>
							<TableHead>Schedule</TableHead>
							<TableHead className="text-right">Actions</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{ subjects.map((subj, i) => (
							<TableRow key={ subj.id }>
								<TableCell>{ i + 1 }</TableCell>
								<TableCell>{ subj.className }</TableCell>
								<TableCell>{ subj.subjectName }</TableCell>
								<TableCell>{ subj.sks }</TableCell>
								<TableCell>
									{ subj.day } { subj.startTime }-{ subj.endTime }
								</TableCell>
								<TableCell className="flex justify-end gap-2">
									<Button
										size="sm"
										variant="outline"
										onClick={ () => {
											setEditing(subj);
											form.reset(subj);
										} }
									>
										<PencilIcon size={ 16 } />
									</Button>
									<Button
										size="sm"
										variant="destructive"
										onClick={ () => deleteSubject(subj.id as string) }
									>
										<TrashIcon size={ 16 } />
									</Button>
								</TableCell>
							</TableRow>
						)) }
					</TableBody>
					<TableFooter>
						<TableRow>
							<TableCell></TableCell>
							<TableCell></TableCell>
							<TableCell>Total SKS</TableCell>
							<TableCell>{ totalSks }</TableCell>
							<TableCell>{ hours }h { minutes }m</TableCell>
							<TableCell></TableCell>
						</TableRow>
					</TableFooter>
				</Table>
			</CardContent>
		</Card>
	);
}
