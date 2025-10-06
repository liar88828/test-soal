import { z } from 'zod';

export const StatusSiswaSchema = z.enum(['aktif','lulus','keluar']);

export type StatusSiswaType = `${z.infer<typeof StatusSiswaSchema>}`

export default StatusSiswaSchema;
