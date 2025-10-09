import { z } from "zod";


export const BillStatusSchema = z.enum([ "LUNAS", "BELUM" ]);

export type BillStatusType = `${ z.infer<typeof BillStatusSchema> }`

export default BillStatusSchema;
