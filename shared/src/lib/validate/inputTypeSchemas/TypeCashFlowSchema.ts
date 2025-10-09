import { z } from "zod";


export const TypeCashFlowSchema = z.enum([ "Masuk", "Keluar" ]);

export type TypeCashFlowType = `${ z.infer<typeof TypeCashFlowSchema> }`

export default TypeCashFlowSchema;
