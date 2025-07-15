import { z } from 'zod';

export const SoalItemScalarFieldEnumSchema = z.enum(['id','soalId','question','A','B','C','D','E','answer']);

export default SoalItemScalarFieldEnumSchema;
