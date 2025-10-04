export type TeacherType = {
	id: string;
	name: string;
	subject: string;
	phone: string;
	email: string;
	address?: string;
	photo?: string;
	gender?: "Male" | "Female";
	birthDate?: Date;
};
