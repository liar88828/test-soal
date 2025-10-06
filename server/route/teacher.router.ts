import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { TeacherOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { z } from "zod";

export const newTeacherOptionalDefaultsSchema = TeacherOptionalDefaultsSchema.extend({
	birthDate: z.coerce.date()
});
const teacherRouter = new Hono()

//
// ✅ GET ALL TEACHERS
//
teacherRouter.get("/", async (c) => {
	const teachers = await prisma.teacher.findMany();
	return c.json(teachers);
});

//
// ✅ GET TEACHER BY ID
//
teacherRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const teacher = await prisma.teacher.findUnique({ where: { id } });
	if (!teacher) return c.json({ message: "Teacher not found" }, 404);
	return c.json(teacher);
});

//
// ✅ CREATE TEACHER
//
teacherRouter.post("/",
	zValidator("json", newTeacherOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")
		data.birthDate = new Date(data.birthDate)

		const newTeacher = await prisma.teacher.create({
			data
		});
		return c.json(newTeacher, 201);
	});

//
// ✅ UPDATE TEACHER
//
teacherRouter.put("/:id",
	zValidator("json", newTeacherOptionalDefaultsSchema),
	async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.teacher.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "Teacher not found" }, 404);

		const data = c.req.valid("json")
		data.birthDate = new Date(data.birthDate)

		const updated = await prisma.teacher.update({
			where: { id },
			data
		});
		return c.json(updated);
	});

//
// ✅ DELETE TEACHER
//
teacherRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.teacher.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "Teacher not found" }, 404);

	await prisma.teacher.delete({ where: { id } });
	return c.json({ message: "Teacher deleted successfully" });
});

export default teacherRouter
