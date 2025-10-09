import { z } from "zod";


export const FinanceSubjectScalarFieldEnumSchema = z.enum([ "id", "name", "code", "category", "cost", "description", "semester", "isActive", "createdAt", "updatedAt" ]);

export default FinanceSubjectScalarFieldEnumSchema;
