// xxx
// ---- Schema ----
import { z } from "zod";

export const mapelFormSchema = z.object({
	id: z.string().optional(),
	idGrade: z.string(),
	idTeacher: z.string(),
	nameTeacher: z.string(),
	nameSubject: z.string(),
	jp: z.number(),

});
export type MapelFormValues = z.infer<typeof mapelFormSchema>;
