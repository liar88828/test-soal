import { z } from "zod";


export const FinanceBillStudentScalarFieldEnumSchema = z.enum([ "id", "name", "kelas", "bulan", "nominal", "status", "createdAt", "updatedAt" ]);

export default FinanceBillStudentScalarFieldEnumSchema;
