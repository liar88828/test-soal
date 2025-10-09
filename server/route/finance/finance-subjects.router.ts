import { FinanceSubjectOptionalDefaultsSchema } from "@shared/lib/validate";
import { Hono } from "hono"
import { prisma } from "server/lib/db/prisma";
import { zValidator } from "server/lib/validation";


const financeSubjects = new Hono()

financeSubjects
.get("/",
	async (c) => {
		const data = await prisma.financeSubject.findMany();
		return c.json(data);
	})
.post(
	zValidator("json", FinanceSubjectOptionalDefaultsSchema),
	async (c) => {
		const data = await prisma.financeSubject.create({ data: c.req.valid("json") });
		return c.json(data, 201);
	});


financeSubjects
.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const found = await prisma.financeSubject.findUnique({ where: { id } });
		if (!found) return c.json({ message: "financeSubjects not found" }, 404);

		return c.json(found);
	})
.put(
	zValidator("json", FinanceSubjectOptionalDefaultsSchema), async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.financeSubject.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "RoomFinance not found" }, 404);

		const data = await prisma.financeSubject.update({
			where: { id },
			data: c.req.valid("json"),
		});
		return c.json(data);
	})
.delete(
	async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.financeSubject.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "room Finance not found" }, 404);

		await prisma.financeSubject.delete({ where: { id } });
		return c.json({ message: "financeSubjects deleted successfully" });
	});

export default financeSubjects
