import { FinanceRoomOptionalDefaultsSchema } from "@shared/lib/validate";
import { Hono } from "hono"
import { prisma } from "server/lib/db/prisma";
import { zValidator } from "server/lib/validation";


const financeRoomRouter = new Hono()

financeRoomRouter.get("/",
	async (c) => {
		const data = await prisma.financeRoom.findMany();
		return c.json(data);
	})
.post("/",
	zValidator("json", FinanceRoomOptionalDefaultsSchema),
	async (c) => {
		const data = await prisma.financeRoom.create({ data: c.req.valid("json") });
		return c.json(data, 201);
	});

financeRoomRouter
.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const found = await prisma.financeRoom.findUnique({ where: { id } });
		if (!found) return c.json({ message: "financeRoom not found" }, 404);

		return c.json(found);
	})
.put("/:id",
	zValidator("json", FinanceRoomOptionalDefaultsSchema), async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.financeRoom.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "RoomFinance not found" }, 404);

		const data = await prisma.financeRoom.update({
			where: { id },
			data: c.req.valid("json"),
		});
		return c.json(data);
	})
.delete("/:id", async (c) => {
	const id = c.req.param("id");
	const exist = await prisma.financeRoom.findUnique({ where: { id } });
	if (!exist) return c.json({ message: "room Finance not found" }, 404);

	await prisma.financeRoom.delete({ where: { id } });
	return c.json({ message: "financeRoom deleted successfully" });
});

export default financeRoomRouter
