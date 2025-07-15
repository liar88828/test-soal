import z from "zod";
import { UserOptionalDefaultsSchema } from "./gen/modelSchema/UserSchema";

export const userLoginSchema = UserOptionalDefaultsSchema.omit({ name: true })
export type UserLoginSchema = z.output<typeof userLoginSchema>;

export const userRegisterSchema = UserOptionalDefaultsSchema
export type UserRegisterSchema = z.output<typeof userRegisterSchema>;
export const answerSchema = z.object({
    student: z.object({
        name: z.string(),
        email: z.string(),
    }),
    answers: z.array(
        z.object({
            soalItemId: z.number(),
            selected: z.enum(['A', 'B', 'C', 'D', 'E']),
        })
    ),
});
