import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { OptionClassScheduleOptionalDefaultsSchema } from "@shared/lib/validate";

const optionRouter = new Hono()

optionRouter.get("/",
	async (c) => {
		const grades = await prisma.optionClassSchedule.findMany();
		return c.json(grades);
	})
.get("/grade/:idGrade",
	async (c) => {
		const idGrade = c.req.param("idGrade");
		const grades = await prisma.optionClassSchedule.findMany({ where: { idGrade } });
		return c.json(grades);
	})
.post(
	zValidator("json", OptionClassScheduleOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")
		const optionClassScheduleDB = await prisma.optionClassSchedule.create({ data });
		return c.json(optionClassScheduleDB, 201);
	})
optionRouter
.delete("/grade/:idGrade/:idOption",
	async (c) => {
		const idOption = c.req.param("idOption")
		const optionClassScheduleDB = await prisma.optionClassSchedule.delete({
			where: { id: idOption }
		});
		return c.json(optionClassScheduleDB, 201);
	});

optionRouter.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const gradeDB = await prisma.optionClassSchedule.findUnique({ where: { id } });
		if (!gradeDB) return c.json({ message: "optionClassSchedule not found" }, 404);

		return c.json(gradeDB);
	});

optionRouter.post("/",
	zValidator("json", OptionClassScheduleOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")
		const optionClassScheduleDB = await prisma.optionClassSchedule.create({ data });
		return c.json(optionClassScheduleDB, 201);
	});

optionRouter.put("/:id",
	zValidator("json", OptionClassScheduleOptionalDefaultsSchema), async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.grade.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "optionClassSchedule not found" }, 404);

		const optionClassScheduleDB = await prisma.optionClassSchedule.update({
			where: { id },
			data: c.req.valid("json"),
		});
		return c.json(optionClassScheduleDB);
	});

optionRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.optionClassSchedule.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "optionClassSchedule not found" }, 404);

	await prisma.optionClassSchedule.delete({ where: { id } });
	return c.json({ message: "optionClassSchedule deleted successfully" });
});

export default optionRouter
