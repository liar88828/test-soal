import { Hono } from "hono"
import { prisma } from "../lib/db/prisma";
import type { TeacherType } from "@shared/types/teacher-type";

const teacherRouter = new Hono()

teacherRouter
.get(
	async (c) => {
		const teachers: TeacherType[] = await prisma.teacher.findMany()
		return c.json(teachers)
	}
)
export default teacherRouter
