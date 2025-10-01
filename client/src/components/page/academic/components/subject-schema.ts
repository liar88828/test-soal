import { z } from "zod";

export const subjectSchema = z.object({
	className: z.string().min(1, "Class name is required"),
	subjectName: z.string().min(1, "Subject name is required"),
	day: z.string().min(1, "Day is required"),
	startTime: z.string().min(1, "Start time is required"),
	endTime: z.string().min(1, "End time is required"),
	sks: z.number().min(1, "SKS must be at least 1"),
	id: z.string().optional(),
});
export type SubjectSchema = z.infer<typeof subjectSchema>
