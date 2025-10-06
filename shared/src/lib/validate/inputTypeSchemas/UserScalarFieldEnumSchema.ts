import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','name','email','role','password','createdAt']);

export default UserScalarFieldEnumSchema;
