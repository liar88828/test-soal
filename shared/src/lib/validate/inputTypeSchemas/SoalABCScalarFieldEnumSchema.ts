import { z } from 'zod';

export const SoalABCScalarFieldEnumSchema = z.enum([ 'id', 'question', 'A', 'B', 'C', 'D', 'E', 'answer', 'soalId' ]);

export default SoalABCScalarFieldEnumSchema;
