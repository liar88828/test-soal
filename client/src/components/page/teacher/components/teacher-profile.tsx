import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card.tsx";
import { Button } from "@/components/ui/button.tsx";

export  type Teacher = {
	id: string;
	name: string;
	subject: string;
	phone: string;
	email: string;
	address?: string;
	photo?: string;
	gender?: "Male" | "Female";
	birthDate?: string;
};

export const exampleTeacher: Teacher = {
	id: "1",
	name: "Mr. Fandy",
	subject: "Math",
	phone: "08123456789",
	email: "fandy@example.com",
	address: "Jl. Merdeka No. 10, Jakarta",
	photo: "https://randomuser.me/api/portraits/men/1.jpg",
	gender: "Male",
	birthDate: "1980-05-12",
};

export function AcademicTeacherDetailProfile({ teacher }: { teacher: Teacher }) {
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
