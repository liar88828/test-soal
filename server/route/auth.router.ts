// routes/authRouter.ts
import { Hono } from "hono"
import { sign, verify } from "hono/jwt" // pastikan kamu pakai `hono/jwt`
import { prisma } from "../lib/db/prisma"
import { UserOptionalDefaultsSchema } from "@shared/lib/validate"
import { password } from "bun"
import { JWT_SECRET } from "@shared/constant"
import { type SessionPayload } from "@shared/types"
import { zValidator } from "@hono/zod-validator";

export type PayloadToken = { userId: string; exp: number }

const authRouter = new Hono()
authRouter.post("/register",
	zValidator("json", UserOptionalDefaultsSchema),
	async (c) => {
		const data = c.req.valid("json")

		const existingUser = await prisma.user.findUnique({
			where: { email: data.email },
		})
		if (existingUser) {
			return c.json({ error: "Email sudah digunakan" }, 400)
		}

		const hashedPassword = await Bun.password.hash(data.password)

		const user = await prisma.user.create({
			data: {
				name: data.name,
				email: data.email,
				password: hashedPassword,
			},
		})

		const payload: SessionPayload = {
			userId: user.id,
			name: user.name,
			role: user.role,
			email: user.email,
			exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 5 minutes
		}
		const token = await sign(payload, JWT_SECRET)

		return c.json({ message: "Register berhasil", token })
	})

authRouter.post("/login",
	zValidator("json", UserOptionalDefaultsSchema.omit({ name: true })),
	async (c) => {
		const data = c.req.valid("json")

		const user = await prisma.user.findUnique({ where: { email: data?.email } })
		if (!user) {
			return c.json({ error: "Email tidak ditemukan" }, 404)
		}

		if (!( await password.verify(data.password, user.password) )) {
			return c.json({ error: "Password salah" }, 401)
		}
		const payload: SessionPayload = {
			userId: user.id,
			name: user.name,
			role: user.role,
			email: user.email,
			exp: Math.floor(Date.now() / 1000) + 60 * 60, // Token expires in 5 minutes
		}
		const token = await sign(payload, JWT_SECRET)

		return c.json({ message: "Login berhasil", token })
	})

authRouter.get("/profile", async (c) => {
	const authHeader = c.req.header("Authorization")
	if (!authHeader || !authHeader.startsWith("Bearer ")) {
		return c.json({ error: "Unauthorized" }, 401)
	}

	const token = authHeader.split(" ")[1]

	try {
		const payload = ( await verify(token ?? "", JWT_SECRET) ) as PayloadToken

		const user = await prisma.user.findUnique({
			where: { id: payload.userId },
			select: {
				id: true,
				name: true,
				email: true,
				createdAt: true,
			},
		})

		if (!user) {
			return c.json({ error: "User tidak ditemukan" }, 404)
		}

		return c.json({ user })
	} catch (err) {
		return c.json({ error: "Token tidak valid atau kedaluwarsa" }, 401)
	}
})

export default authRouter
