import { z } from 'zod';

export const LevelSchema = z.enum(['PAUD','TK','SD','SMP','SMK']);

export type LevelType = `${z.infer<typeof LevelSchema>}`

export default LevelSchema;
