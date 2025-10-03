import * as z from "zod";

export const teacherFormData = z.object({
	name: z.string().min(2),
	subject: z.string(),
	phone: z.string(),
	email: z.email(),
	address: z.string(),
	photo: z.url(),
	gender: z.enum([ "Male", "Female" ]),
	birthDate: z.string(),
});
export type TeacherFormData = z.infer<typeof teacherFormData>;
