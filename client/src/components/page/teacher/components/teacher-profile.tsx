import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";
import { useTeacherStore } from "@/stores/use-teacher-store.ts";


export function TeacherProfile(props: { idTeacher?: string }) {
	// const { data: teacher } = useTeacherDetails(props.idTeacher)
	const teacher = useTeacherStore(state => state.teachers.find(i => i.id === props.idTeacher))
	if (!teacher) {
		return null;
	}

	return (
		<Card>
			<CardHeader>
				<CardTitle>{ teacher.name }</CardTitle>
				<CardDescription>{ teacher.subject } Teacher</CardDescription>
			</CardHeader>
			<CardContent className="flex flex-col gap-4">
				{ teacher.photo && (
					<img
						src={ teacher.photo }
						alt={ teacher.name }
						className="w-32 h-32 rounded-full mx-auto"
					/>
				) }
				<div>
					<p><strong>Phone:</strong> { teacher.phone }</p>
					<p><strong>Email:</strong> { teacher.email }</p>
					{ teacher.address && <p><strong>Address:</strong> { teacher.address }</p> }
					{ teacher.gender && <p><strong>Gender:</strong> { teacher.gender }</p> }
					{ teacher.birthDate && <p><strong>Birth Date:</strong> { teacher.birthDate }</p> }
				</div>
				<Button className="mt-2 w-full">Edit Teacher</Button>
			</CardContent>
		</Card>
	);
}
