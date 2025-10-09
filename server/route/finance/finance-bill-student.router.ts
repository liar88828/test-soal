import { FinanceBillStudentOptionalDefaultsSchema } from "@shared/lib/validate";
import type { FinanceClass } from "@shared/types/finance-type";
import { Hono } from "hono"
import { prisma } from "server/lib/db/prisma";
import { zValidator } from "server/lib/validation";


const financeBillStudent = new Hono()

financeBillStudent
.get("/",
	async (c) => {
		const data = await prisma.financeBillStudent.findMany();
		return c.json(data);
	})
.post(
	zValidator("json", FinanceBillStudentOptionalDefaultsSchema),
	async (c) => {
		const data = await prisma.financeBillStudent.create({ data: c.req.valid("json") });
		return c.json(data, 201);
	});

financeBillStudent.get("/class",
	async (c) => {
		const billStudents = await prisma.financeBillStudent.groupBy({
			by: [ "kelas" ],
			_sum: { nominal: true },
			_count: { kelas: true },
		});
		const data: FinanceClass[] = billStudents.map(i => ( {
			totalPaid: i._sum.nominal ?? 0,
			className: i.kelas,
			studentCount: i._count.kelas
		} ))
		return c.json(data, 201);
	});

financeBillStudent
.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const found = await prisma.financeBillStudent.findUnique({ where: { id } });
		if (!found) return c.json({ message: "financeBillStudent not found" }, 404);

		return c.json(found);
	})
.put(
	zValidator("json", FinanceBillStudentOptionalDefaultsSchema), async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.financeBillStudent.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "RoomFinance not found" }, 404);

		const data = await prisma.financeBillStudent.update({
			where: { id },
			data: c.req.valid("json"),
		});
		return c.json(data);
	})
.delete(
	async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.financeBillStudent.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "room Finance not found" }, 404);

		await prisma.financeBillStudent.delete({ where: { id } });
		return c.json({ message: "financeBillStudent deleted successfully" });
	});

export default financeBillStudent
