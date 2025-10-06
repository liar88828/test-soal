import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { ClassesOptionalDefaultsSchema } from "@shared/lib/validate";

const classesRouter = new Hono()

classesRouter.get("/", async (c) => {
	const classResponse = await prisma.classes.findMany();
	return c.json(classResponse);
})
.post('/',
	zValidator("json", ClassesOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")
		console.log(data);

		const classDB = await prisma.classes.create({ data });
		return c.json(classDB, 201);
		// return c.json({message:"test"});
	});

classesRouter
.get(`/grade/:idGrade`,
	async (c) => {
		const idGrade = c.req.param("idGrade")
		const classes = await prisma.classes.findMany({ where: { idGrade } });
		return c.json(classes);
	})
.post("/grade/:idGrade",
	zValidator("json", ClassesOptionalDefaultsSchema),
	async (c) => {
		const idGrade = c.req.param("idGrade");
		const data = c.req.valid("json")
		data.idGrade = idGrade;
		console.log(data);

		const classDB = await prisma.classes.create({ data });
		return c.json(classDB, 201);
		// return c.json({message:"test"});
	});

classesRouter.get("/:id", async (c) => {
	const id = c.req.param("id");
	const classDB = await prisma.classes.findUnique({ where: { id } });
	if (!classDB) return c.json({ message: "Class not found" }, 404);
	return c.json(classDB);
});

classesRouter.put("/:id",
	zValidator("json", ClassesOptionalDefaultsSchema),
	async (c) => {

		const id = c.req.param("id");
		const exist = await prisma.classes.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "Class not found" }, 404);

		const data = c.req.valid("json")
		const classDB = await prisma.classes.update({ where: { id }, data });

		return c.json(classDB);
	});

classesRouter.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.classes.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "Class not found" }, 404);

	await prisma.classes.delete({ where: { id } });
	return c.json({ message: "Class deleted successfully" });
});

export default classesRouter
