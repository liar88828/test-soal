import { z } from "zod";

export const TeacherGenderSchema = z.enum([ "Male", "Female" ]);

export type TeacherGenderType = `${ z.infer<typeof TeacherGenderSchema> }`

export default TeacherGenderSchema;
