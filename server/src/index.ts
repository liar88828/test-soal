import { Hono } from "hono"
import { cors } from "hono/cors"
import type { ApiResponse } from "shared/dist"
import authRouter from "../route/auth.router";
import soalRouter from "../route/soal.router";
import teacherRouter from "../route/teacher.router";

const app = new Hono()
app.use(cors())
app.get("/", (c) => {
	return c.text("Hello Hono!")
})
app.get("/hello", async (c) => {
	const data: ApiResponse = {
		message: "Hello BHVR!",
		success: true
	}
	return c.json(data, { status: 200 })
})

app.route("/soal", soalRouter)
app.route("/auth", authRouter)
app.route("/teacher", teacherRouter)

export default app
