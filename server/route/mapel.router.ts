import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import { zValidator } from "@hono/zod-validator";
import { MapelOptionalDefaultsSchema } from "@shared/lib/validate";
import type { CountData } from "@shared/types/mapel-type";

const mapelRouter = new Hono()

mapelRouter
.get("/",
	async (c) => {
		const mapels = await prisma.mapel.findMany();
		return c.json(mapels);
	})
.post(
	zValidator("json", MapelOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")
		const newMapel = await prisma.mapel.create({ data });
		return c.json(newMapel, 201);
	});

mapelRouter
.get("/teacher/:idTeacher",
	async (c) => {
		const idTeacher = c.req.param("idTeacher")
		const mapels = await prisma.mapel.findMany({ where: { idTeacher } });
		return c.json(mapels);
	})
.get("/grade/:idGrade",
	async (c) => {
		const idGrade = c.req.param("idGrade")
		const mapels = await prisma.mapel.findMany({ where: { idGrade } });
		return c.json(mapels);
	})
.get("/count/:idGrade",
	async (c) => {
		const idGrade = c.req.param("idGrade")
		const mapels = await prisma.mapel.findMany({ where: { idGrade } });

		// Aggregate efficiently using reduce
		const summary = mapels.reduce<Record<string, CountData>>((acc, { name, jp }) => {
			if (!acc[name]) {
				acc[name] = {
					nameSubject: name,
					count: 0,
					totalJP: 0,
					totalMaxJP: 0,
					totalNeedJP: 0,
				};
			}
			acc[name].count += 1;
			acc[name].totalJP += jp;
			return acc;
		}, {});

		// Compute derived values (single pass)
		const count = Object.values(summary).map((s) => {
			const totalMaxJP = s.count * 45; // example constant logic
			const totalNeedJP = Math.max(0, totalMaxJP - s.totalJP);
			return { ...s, totalMaxJP, totalNeedJP };
		});

		return c.json(count);
	})

mapelRouter
.get("/:id",
	async (c) => {
		const id = c.req.param("id");
		const mapel = await prisma.mapel.findUnique({ where: { id, } });
		if (!mapel) return c.json({ message: "Mapel not found" }, 404);
		return c.json(mapel);
	})
.put(
	zValidator("json", MapelOptionalDefaultsSchema),
	async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.mapel.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "Mapel not found" }, 404);

		const data = c.req.valid("json")
		const updated = await prisma.mapel.update({
			where: { id },
			data
		});
		return c.json(updated);
	})
.delete(
	async (c) => {
		const id = c.req.param("id");
		const exist = await prisma.mapel.findUnique({ where: { id } });
		if (!exist) return c.json({ message: "Mapel not found" }, 404);

		await prisma.mapel.delete({ where: { id } });
		return c.json({ message: "Mapel deleted successfully" });
	});

export default mapelRouter
