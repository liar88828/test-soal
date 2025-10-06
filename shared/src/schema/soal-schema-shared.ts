import { z } from "zod";
import { AnswerSchema, StudentAnswerSchema } from "@shared/lib/validate";

export const SoalSchemaABC = z.object({
	studentAnswer: StudentAnswerSchema,
	answers: z.array(AnswerSchema),
})
