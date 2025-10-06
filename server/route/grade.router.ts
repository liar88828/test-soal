import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { GradeSchema } from "@shared/lib/validate";

const gradeRouter = new Hono()

gradeRouter.get("/",
	async (c) => {
		const grades = await prisma.grade.findMany();
		return c.json(grades);
	});

// gradeRouter.get(`/class/:idGrade`, async (c) => {
// 	const idGrade = c.req.param("idGrade")
// 	const classesDB = await prisma.classes.findMany({ where: { idGrade } });
// 	return c.json(classesDB);
// });

gradeRouter.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const gradeDB = await prisma.grade.findUnique({ where: { id } });
		if (!gradeDB) return c.json({ message: "Grades not found" }, 404);

		return c.json(gradeDB);
	});

gradeRouter.post("/",
	zValidator("json", GradeSchema),
	async (c) => {
		const gradeDB = await prisma.grade.create({ data: c.req.valid("json") });
		return c.json(gradeDB, 201);
	});

gradeRouter.put("/:id", zValidator("json", GradeSchema), async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.grade.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "Teacher not found" }, 404);

	const gradeDB = await prisma.grade.update({
		where: { id },
		data: c.req.valid("json"),
	});
	return c.json(gradeDB);
});

gradeRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.grade.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "grade not found" }, 404);

	await prisma.grade.delete({ where: { id } });
	return c.json({ message: "grade deleted successfully" });
});

export default gradeRouter
