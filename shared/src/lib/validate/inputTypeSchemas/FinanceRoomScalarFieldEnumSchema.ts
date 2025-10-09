import { z } from "zod";


export const FinanceRoomScalarFieldEnumSchema = z.enum([ "id", "room", "cost", "note", "createdAt", "updatedAt" ]);

export default FinanceRoomScalarFieldEnumSchema;
