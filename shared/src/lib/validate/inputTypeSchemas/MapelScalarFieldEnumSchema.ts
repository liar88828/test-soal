import { z } from "zod";

export const MapelScalarFieldEnumSchema = z.enum([ "id", "name", "jp", "idGrade", "idTeacher", "nameTeacher" ]);

export default MapelScalarFieldEnumSchema;
