import { z } from "zod";


export const FinanceCashFlowScalarFieldEnumSchema = z.enum([ "id", "type", "description", "amount", "date" ]);

export default FinanceCashFlowScalarFieldEnumSchema;
