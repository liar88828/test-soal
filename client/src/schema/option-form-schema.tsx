import { z } from "zod";

export const optionFormSchema = z.object({
	id: z.string().optional(),
	idGrade: z.string().min(1, "ID Grade"),
	nameSubject: z.string().min(2, "Nama Pelajaran minimal 2 karakter"),
	jp: z.number().min(1, "JP minimal 1"),
});
export type OptionFormValues = z.infer<typeof optionFormSchema>;
