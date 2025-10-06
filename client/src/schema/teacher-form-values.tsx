// ✅ Zod schema for validation

import { z } from "zod";

export const classFormSchema = z.object({
	id:z.string().optional(),
	idGrade: z.string().min(1, "Level is required"),
	section: z.string().min(1, "Section is required"),
	nameTeacher: z.string().min(1, "Teacher is required"),
	idTeacher: z.string().min(1, "Teacher is required"),
	students: z.number().min(1, "Students is required"),
	room: z.string(),
	schedule: z.string().min(1, "Schedule is required"),
});
export type TeacherFormValues = z.infer<typeof classFormSchema>;
