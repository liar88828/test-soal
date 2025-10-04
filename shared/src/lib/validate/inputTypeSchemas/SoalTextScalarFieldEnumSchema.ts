import { z } from "zod";

export const SoalTextScalarFieldEnumSchema = z.enum([ "id", "question", "text", "answer", "soalId" ]);

export default SoalTextScalarFieldEnumSchema;
