import { z } from "zod";


export const CostItemScalarFieldEnumSchema = z.enum([ "id", "subjectId", "name", "amount", "description", "createdAt" ]);

export default CostItemScalarFieldEnumSchema;
