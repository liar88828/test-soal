import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { TeacherOptionalDefaultsSchema } from "shared/dist/lib/validate";
import { z } from "zod";

export const newTeacherOptionalDefaultsSchema = TeacherOptionalDefaultsSchema.extend({
	birthDate: z.coerce.date()
});
const teacherRouter = new Hono()

teacherRouter.get("/",
	async (c) => {
		const teachers = await prisma.teacher.findMany();
		return c.json(teachers);
	})
.get(`/not-class/:idGrade`,
	async (c) => {
		const idClass = c.req.param("idClass")
		// const grades = await prisma.optionClassSchedule.findMany({ where: { idGrade } });

		const teachers = await prisma.teacher.findMany({
			where: {
				NOT: {
					Classes: {
						some: { id: idClass }
					}
				}
			}
		});
		return c.json(teachers);
	});
teacherRouter.get("/grade/:idGrade",
	async (c) => {
		const idGrade = c.req.param("idGrade")
		const teachers = await prisma.teacher.findMany({
			where: {
				NOT: {
					Classes: {
						some: { idGrade }
					}
				}
			}
		});
		return c.json(teachers);
	})
teacherRouter.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const teacher = await prisma.teacher.findUnique({ where: { id } });
		if (!teacher) return c.json({ message: "Teacher not found" }, 404);
		return c.json(teacher);
	});

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

teacherRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.teacher.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "Teacher not found" }, 404);

	await prisma.teacher.delete({ where: { id } });
	return c.json({ message: "Teacher deleted successfully" });
});

export default teacherRouter
